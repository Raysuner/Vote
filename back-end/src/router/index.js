const fsp = require("fs/promises")

async function useAllRoutes() {
    const files = await fsp.readdir(__dirname)
    for (const file of files) {
        if (file === "index.js") {
            continue
        }
        const router = require(`./${file}`)
        this.use(router.routes())
        this.use(router.allowedMethods())
    }
}

module.exports = useAllRoutes