export const swaggerOptions = {
    definition:{
        openApi:'3.0.1',
        info: {
            title: 'Documentacion de apiRest',
            description: 'Documentacion de api rest con swagger',
            contact: {
                name: 'Santiago Viale',
                email: 'santicbsn9@gmail.com'
            },
        },
    },
    apis:['./source/docs/**/*.yaml'],
}