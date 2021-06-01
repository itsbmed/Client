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
                    @sumbit.prevent
                    class="form"
                    v-model="valid"
                >
                    <div class="display-1 text-center">Agent Login</div>

                    <div class="mt-10">
                        <!-- <label for="username">Username</label> -->
                        <v-text-field
                            filled
                            rounded
                            single-line
                            v-model="username"
                            :rules="usernameRules"
                            label="Username"
                            prepend-inner-icon="mdi-account"
                            required
                        ></v-text-field>
                    </div>
                    <div>
                        <!-- <label for="password">Password</label> -->
                        <v-text-field
                            filled
                            rounded
                            single-line
                            :append-icon="
                                showPassword ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            :type="showPassword ? 'text' : 'password'"
                            v-model="password"
                            :rules="passwordRules"
                            label="Password"
                            required
                            prepend-inner-icon="mdi-lock"
                            @click:append="showPassword = !showPassword"
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
                            @click="login"
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
export default {
    name: "Login",
    data: () => ({
        username: "",
        password: "",
        valid: false,
        loading: false,
        showPassword: false,
    }),
    computed: {
        usernameRules: () => [(v) => !!v || "Username can't be empty"],
        passwordRules: () => [(v) => !!v || "Password can't be empty"],
    },
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
            } catch (err) {
                switch (err.status) {
                    case 404:
                        this.gerr = err.data.message;
                        break;
                    case 401:
                        this.gerr = err.data.message;
                        break;
                    default:
                        this.gerr = "username or password invalid";
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
