import { rest } from "msw";

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
    })
]