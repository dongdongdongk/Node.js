// AppError 클래스를 정의합니다. 이 클래스는 Error 클래스를 확장합니다.
class AppError extends Error {
    // constructor 메서드를 정의합니다. 이 메서드는 객체를 생성할 때 호출됩니다. (생성자)
    constructor(message, status) {
        // 부모 클래스인 Error 클래스의 constructor를 호출합니다.
        super();
        // 현재 객체의 message 속성을 전달받은 message 값으로 설정합니다.
        this.message = message;
        // 현재 객체의 status 속성을 전달받은 status 값으로 설정합니다.
        this.status = status;
    }
}

// AppError 클래스를 모듈로 내보냅니다.
module.exports = AppError;