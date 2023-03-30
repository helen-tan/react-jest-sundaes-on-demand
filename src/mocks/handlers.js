import { rest } from "msw";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const handlers = [
    // Handles (intercepts) GET /scoops request
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
        // Specify a mocked response    
        return res(
            ctx.json([
                { name: 'Chocolate', imagePath: '/images.chocolate.png' },
                { name: 'Vanilla', imagePath: '/images/vanilla.png' }
            ])
        )
    }),
    // Handles GET /toppings request
    rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
        return res(
            ctx.json([
                { name: 'Cherries', imagePath: '/image/cherries.png' },
                { name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
                { name: 'Hot Fudge', imagePath: '/images/hot-fudge.png' }
            ])
        )
    }),
    rest.post("http://localhost:3030/order", async (req, res, ctx) => {
        await sleep(100)
        // create a random order number
        const orderNumber = Math.floor(Math.random() * 10000000000)
        
        return res(
            ctx.json({ orderNumber })
        )
    })

]