export class HttpError extends Error{
    constructor(content, code = 500, name = "Internal Server Error") {
        super(JSON.stringify(content));
        this.name = name;
        this.code = code;
    }

    getMessage(){
        return JSON.parse(this.message)
    }

    getCode(){
        return this.code;
    }

    getName(){
        return this.name;
    }
}
