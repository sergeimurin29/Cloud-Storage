export const clientConfig = {
    "server": "http://localhost:5000/api/",
    "post": {
        "auth": {
            "sign-up": "auth/sign-up",
            "sign-in": "auth/sign-in"
        },
        "files": {
            "files": "files",
            "upload": "files/upload"
        },
    },
    "get": {
        "auth": {
            "auth": "auth/auth"
        },
        "files": {
            "files": "files",
            "download": "files/download"
        }
    },
    "delete": {
        "files": {
            "file": "files"
        }
    }
}
