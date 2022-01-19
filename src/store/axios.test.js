const rewire = require("rewire")
const axios = rewire("./axios")
const authTokenRefresh = axios.__get__("authTokenRefresh")
// @ponicode
describe("authTokenRefresh", () => {
    test("0", async () => {
        await authTokenRefresh()
    })
})