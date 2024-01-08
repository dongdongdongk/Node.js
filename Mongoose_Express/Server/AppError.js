// AppError Ŭ������ �����մϴ�. �� Ŭ������ Error Ŭ������ Ȯ���մϴ�.
class AppError extends Error {
    // constructor �޼��带 �����մϴ�. �� �޼���� ��ü�� ������ �� ȣ��˴ϴ�. (������)
    constructor(message, status) {
        // �θ� Ŭ������ Error Ŭ������ constructor�� ȣ���մϴ�.
        super();
        // ���� ��ü�� message �Ӽ��� ���޹��� message ������ �����մϴ�.
        this.message = message;
        // ���� ��ü�� status �Ӽ��� ���޹��� status ������ �����մϴ�.
        this.status = status;
    }
}

// AppError Ŭ������ ���� �������ϴ�.
module.exports = AppError;