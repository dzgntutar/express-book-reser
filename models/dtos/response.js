class BaseResponse {
    static Error(err) {
        this.IsSuccess = false;
        this.Messge = err;

        return this;
    }

    static Success(message, data) {
        this.Data = data;
        this.IsSuccess = true;
        this.message = message;

        return this;
    }
}

export { BaseResponse };
