<template>
    <v-container fluid class="main-container">
        <v-snackbar
            v-model="snackbar"
            timeout="4000"
            top
            right
            multi-line
            :color="snackbarColor"
        >
            <v-icon color="white" class="mr-2">
                mdi-comment-alert-outline
            </v-icon>
            {{ snackbarText }}
        </v-snackbar>
        <v-row align="center" justify="center">
            <v-col cols="10">
                <v-file-input
                    show-size
                    small-chips
                    multiple
                    accept=".xml"
                    label="XML file input"
                    v-model="files"
                />
            </v-col>
            <v-btn
                color="primary"
                text
                @click="upload()"
                :disabled="files.length === 0"
            >
                upload
            </v-btn>
        </v-row>
        <v-row align="center" justify="center">
            <v-card class="table-card mb-10 mx-10">
                <v-card-title class="mx-5">
                    <v-row>
                        <v-col cols="4">
                            <span>
                                {{
                                    selectedCat !== ""
                                        ? selectedCat
                                        : "no catalog selected"
                                }}
                            </span>
                        </v-col>
                        <v-col cols="3">
                            <v-select
                                v-model="selectedCat"
                                :items="catalogs"
                                label="Catalog"
                                @change="selectChange()"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="search"
                                :disabled="selectedCat === ''"
                                append-icon="mdi-magnify"
                                label="Search"
                                single-line
                                hide-details
                            />
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="data"
                    :search="search"
                ></v-data-table>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
import axios from "axios";

export default {
    name: "Main",
    data: () => ({
        // snack bar
        snackbar: false,
        snackbarText: "",
        snackbarColor: "success",
        // actual data
        files: [],
        originalData: {}, // original data from server
        processedData: {}, // keys are strings
        catalogs: [],
        // table data
        headers: [],
        data: [],
        // search
        search: "",
        // selected
        selectedCat: "",
    }),
    methods: {
        async upload() {
            // reset data
            this.processedData = {}; // keys are strings
            this.catalogs = [];
            this.selectedCat = "";
            this.reset();

            let formData = new FormData();
            formData.append("file", this.files[0]);

            axios
                .post("http://localhost:8080/api/convert/xml/", formData)
                .then(async (response) => {
                    this.originalData = JSON.parse(response.data.data);

                    try {
                        let res = await this.getCatalogs();

                        if (res === 200) {
                            res = await this.getData(this.selectedCat);

                            this.showSnackbar(
                                `${this.selectedCat} data successfully loaded`,
                                "success"
                            );
                        }
                    } catch (err) {
                        this.showSnackbar("Failed to load data", "error");
                    }
                });
        },
        async selectChange() {
            try {
                this.reset();

                let res = await this.getData(this.selectedCat);
                if (res === 200)
                    this.showSnackbar(
                        `${this.selectedCat} data successfully loaded`,
                        "success"
                    );
            } catch (err) {
                this.showSnackbar("Something is going wrong", "error");
            }
        },
        getCatalogs() {
            return new Promise((resolve, reject) => {
                try {
                    const self = this;

                    Object.values(this.originalData).forEach(function(val) {
                        Object.keys(val).forEach(function(cat) {
                            self.catalogs.push(cat.toString());
                            self.processedData[cat.toString()] = val[cat];
                        });
                    });

                    // set catalog
                    self.selectedCat = self.catalogs[0];

                    resolve(200);
                } catch (err) {
                    reject(500);
                }
            });
        },
        getData(catalog) {
            return new Promise((resolve, reject) => {
                try {
                    const self = this;

                    Object.keys(self.processedData).forEach(function(cat) {
                        if (cat === catalog) {
                            self.processedData[cat].map((obj) => {
                                let singleObj = {};
                                for (let key in obj) {
                                    if (obj[key].constructor.name === "Array") {
                                        // @
                                        // HEADERS
                                        // @
                                        self.setHeaders(key);
                                        // @
                                        // DATA
                                        // @
                                        singleObj[key] = obj[key][0];
                                    } else if (
                                        obj[key].constructor.name === "Object"
                                    ) {
                                        for (let subkey in obj[key]) {
                                            // @
                                            // HEADERS
                                            // @
                                            self.setHeaders(subkey);
                                            // @
                                            // DATA
                                            // @
                                            singleObj[subkey] =
                                                obj[key][subkey];
                                        }
                                    }
                                }
                                self.data.push(singleObj);
                            });
                        }
                    });

                    resolve(200);
                } catch (err) {
                    reject(500);
                }
            });
        },
        setHeaders(key) {
            if (
                !this.containsObject(
                    {
                        text: this.capitalize(key),
                        value: key,
                    },
                    this.headers
                )
            )
                this.headers.push({
                    text: this.capitalize(key),
                    value: key,
                });
        },
        reset() {
            this.headers = [];
            this.data = [];
        },
        showSnackbar(text, color) {
            this.snackbar = true;
            this.snackbarText = text;
            this.snackbarColor = color;
        },
        capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        containsObject(obj, arr) {
            let i;
            for (i = 0; i < arr.length; i++) {
                if (
                    arr[i]["text"] === obj["text"] &&
                    arr[i]["value"] === obj["value"]
                ) {
                    return true;
                }
            }
            return false;
        },
    },
};
</script>
<style scoped>
.main-container {
    height: 100%;
}

.table-card {
    width: 100%;
    overflow: auto;
}
.table-card-title {
    margin-top: -2rem !important;
}
</style>
