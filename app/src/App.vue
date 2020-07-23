<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list dense>
                <!-- <v-list-item v-for="item in items" :key="item.text" link>
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.text }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item> -->
                <!-- <v-list>
                    <v-list-item v-for="item in items2" :key="item.text" link>
                        <v-list-item-avatar>
                            <img
                                :src="
                                    `https://randomuser.me/api/portraits/men/${item.picture}.jpg`
                                "
                                alt=""
                            />
                        </v-list-item-avatar>
                        <v-list-item-title
                            v-text="item.text"
                        ></v-list-item-title>
                    </v-list-item>
                </v-list>
                <v-list-item class="mt-4" link>
                    <v-list-item-action>
                        <v-icon color="grey darken-1"
                            >mdi-plus-circle-outline</v-icon
                        >
                    </v-list-item-action>
                    <v-list-item-title class="grey--text text--darken-1"
                        >Browse Channels</v-list-item-title
                    >
                </v-list-item> -->
                <v-subheader class="ml-2 grey--text text--darken-1">
                    DATA VISUALIZATION
                </v-subheader>
                <v-list-item link @click="toggleComponent('xml')">
                    <v-list-item-action>
                        <v-icon color="grey darken-1">mdi-xml</v-icon>
                    </v-list-item-action>
                    <v-list-item-title class="grey--text text--darken-1">
                        XML
                    </v-list-item-title>
                </v-list-item>
                <v-subheader class="ml-2 grey--text text--darken-1">
                    MORE
                </v-subheader>
                <v-list-item link @click="toggleComponent('about')">
                    <v-list-item-action>
                        <v-icon color="grey darken-1">mdi-information</v-icon>
                    </v-list-item-action>
                    <v-list-item-title class="grey--text text--darken-1">
                        About
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app clipped-left color="white">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <span class="ml-2">Data Management Tool</span>
            <v-spacer />
            <div class="d-flex align-center">
                <v-img
                    alt="Vuetify Logo"
                    class="shrink mr-2"
                    contain
                    src="./assets/uwologo.png"
                    transition="scale-transition"
                    width="40"
                />
            </div>
        </v-app-bar>

        <v-main>
            <Main v-if="xml" />
            <About v-if="about" />
        </v-main>
    </v-app>
</template>

<script>
import Main from "./components/Main";
import About from "./components/About";

export default {
    name: "App",
    components: {
        Main,
        About,
    },
    data: () => ({
        xml: true,
        about: false,
        drawer: null,
        items: [
            { icon: "mdi-trending-up", text: "Most Popular" },
            { icon: "mdi-youtube-subscription", text: "Subscriptions" },
            { icon: "mdi-history", text: "History" },
            { icon: "mdi-playlist-play", text: "Playlists" },
            { icon: "mdi-clock", text: "Watch Later" },
        ],
        items2: [
            { picture: 28, text: "Joseph" },
            { picture: 38, text: "Apple" },
            { picture: 48, text: "Xbox Ahoy" },
            { picture: 58, text: "Nokia" },
            { picture: 78, text: "MKBHD" },
        ],
    }),
    methods: {
        toggleComponent(target) {
            this.xml = target === "xml" ? true : false;
            this.about = target === "about" ? true : false;
        },
    },
};
</script>
<style>
* {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !important;
}
</style>
