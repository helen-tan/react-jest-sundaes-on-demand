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
    })
]