export const clientConfig = {
    "server": "http://localhost:5000/api/",
    "post": {
        "auth": {
            "sign-up": "auth/sign-up",
            "sign-in": "auth/sign-in"
        },
        "files": "files",
    },
    "get": {
        "user":{
            "space":"user/space"
        },
        "auth": {
            "auth": "auth/auth"
        },
        "files": {
            "files": "files",
            "file": "files/file",
            "download": "files/download",
            "search": "files/search"
        }
    },
    "delete": {
        "files": "files"
    },
    "put": {
        "files": "files"
    }
}
