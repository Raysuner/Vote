import fsp from "fs/promises"

export async function useAllRoutes() {
    const files = await fsp.readdir(__dirname)
    for (const file of files) {
        if (file === "index.ts") {
            continue
        }
        const router = require(`./${file}`)
        this.use(router.routes())
        this.use(router.allowedMethods())
    }
}