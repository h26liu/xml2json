<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <!-- <v-row class="text-center" style="margin-top: 12%">
            <v-col cols="12">
                <h3 class="headline font-weight-bold content">
                    Covid Testing Data Management Tool
                </h3>
            </v-col>
        </v-row>
        <v-row class="text-center mt-10">
            <v-col cols="12">
                <span class="content">
                    Data Visulization
                </span>
            </v-col>
            <v-col cols="12">
                <span class="content">
                    Takes XML based data files and present data in a user
                    friendly way (in tables, in charts etc.)
                </span>
            </v-col>
        </v-row>
        <v-footer absolute color="white" class="font-weight-light overline">
            <v-col class="text-center" cols="12">
                {{ new Date().getFullYear() }} - built with &#10084;&#65039; by
                eric liu
            </v-col>
        </v-footer> -->
            <v-col cols="12" sm="8" md="7">
                <v-card class="elevation-12">
                    <v-card-subtitle>
                        <v-col
                            class="text-center content font-weight-bold mt-2"
                            cols="12"
                        >
                            Covid-19 Testing Data Management Tool
                        </v-col>
                    </v-card-subtitle>
                    <!-- <v-card-text>
                        <v-col class="text-center" cols="12">
                            <span class="content">
                                Takes XML based data files and present data in a
                                user friendly way, like in tables, in charts
                                etc.
                            </span>
                        </v-col>
                    </v-card-text> -->
                    <v-card-text class="font-weight-light overline">
                        <v-col class="text-center" cols="12">
                            hliu823@uwo.ca
                            <br />
                            {{ new Date().getFullYear() }} - built with
                            &#10084;&#65039; by eric liu
                        </v-col>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "About",

    data: () => ({}),
};
</script>
<style scoped>
.content {
    opacity: 0.9;
    letter-spacing: 0.1rem;
}
</style>
