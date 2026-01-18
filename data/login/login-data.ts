export const invalidLogin = [
    {
        testCaseName: 'Verify email empty',
        input: {
            'Email': '',
            'Enter your password': '12345678'
        },
        expect: {
            'Email': 'Email is required'
        }
    },
    {
        testCaseName: 'Verify password empty',
        input: {
            'Email': 'namvh@leadsgen.asia',
            'Enter your password': ''
        },
        expect: {
            'Enter your password': 'Password is required'
        }
    }
]
