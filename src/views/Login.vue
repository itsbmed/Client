<template>
    <div class="login">
        <v-container class="container d-flex align-center justify-center">
            <div class="content d-flex">
                <div class="image">
                    <v-img
                        src="../assets/images/login.png"
                        alt="login image"
                        max-width="400px"
                    />
                </div>

                <v-form
                    ref="login"
                    @submit.prevent="login"
                    class="form"
                    v-model="valid"
                >
                    <div class="display-1 text-center mb-5">Agent Login</div>

                    <div class="mt-5">
                        <v-text-field
                            v-model="username"
                            :rules="usernameRule"
                            single-line
                            rounded
                            outlined
                            label="Username"
                            prepend-inner-icon="mdi-account"
                            required
                        ></v-text-field>
                    </div>
                    <div>
                        <v-text-field
                            v-model="password"
                            :rules="passwordRule"
                            :append-icon="
                                showPassword ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            :type="showPassword ? 'text' : 'password'"
                            label="Password"
                            prepend-inner-icon="mdi-lock"
                            @click:append="showPassword = !showPassword"
                            single-line
                            rounded
                            outlined
                            required
                        ></v-text-field>
                    </div>

                    <div class="">
                        <v-btn
                            type="submit"
                            text
                            outlined
                            height="40"
                            color="white"
                            class="text-capitalize primary rounded-xl"
                            block
                            :loading="loading"
                            :disabled="loading"
                        >
                            Login
                        </v-btn>
                    </div>
                </v-form>
            </div>
        </v-container>
    </div>
</template>

<script>
import { usernameRule, passwordRule } from "../helpers/inputsRules";
export default {
    name: "Login",
    data: () => ({
        username: "",
        password: "",
        valid: false,
        loading: false,
        showPassword: false,
        usernameRule,
        passwordRule,
    }),

    methods: {
        async login() {
            if (!this.$refs.login.validate()) return;
            try {
                this.loading = true;
                await this.$store.dispatch("signIn", {
                    userName: this.username,
                    passWord: this.password,
                });
                if (this.$route.query.nextPath) {
                    this.$router
                        .push({
                            name: this.$route.query.nextPath,
                            params: this.$route.params,
                        })
                        .then(null, () => {
                            this.$router.push({
                                path: "/NotFound",
                            });
                        });
                } else {
                    this.$router.push({
                        name: "Dashboard",
                    });
                }
            } catch ({ response: err }) {
                switch (err.status) {
                    case 404:
                        this.$notify({
                            group: "br",
                            type: "error",
                            title: "Login Error",
                            text: "Agent not found !",
                        });
                        break;
                    case 401:
                        this.$notify({
                            group: "br",
                            type: "error",
                            title: "Login Error",
                            text: "username/password incorrect !",
                        });
                        break;
                    default:
                        this.$notify({
                            group: "br",
                            type: "error",
                            title: "Login Error",
                            text: "Something went wrong !",
                        });
                        break;
                }
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
<style scoped lang="scss">
.login {
    width: 100vw;
    height: 100%;
    display: flex;
    padding: 1rem;
    align-items: center;
    justify-content: center;
    .container {
        min-height: 80%;
        background: white;
        max-width: 900px;
        border-radius: 10px;
        padding: 1rem;
        box-shadow: 0px 0px 10px rgba(#000000, 0.2);
    }
    .content {
        justify-content: center;
        min-width: 80%;
        flex-wrap: wrap;
        gap: 80px;
    }
    .image {
        margin-top: 20px;
        @media screen and (max-width: 820px) {
            display: none;
        }
    }
}
</style>
