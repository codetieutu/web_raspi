const apiBase = localStorage.getItem('apiHost') || "http://192.168.1.223:8080";

let isStreaming = true;
let isChanged = false;

$(document).ready(function () {
    // Mặc định disable nút Dừng chụp
    $('#stopCaptureBtn').prop('disabled', true);
    $('#camera').attr('src', `${apiBase}/video`);
    $('#captureBtn').click(function () {
        const name = $('#nameInput').val().trim();
        if (!name) {
            showToast("❌ Vui lòng nhập tên!", false);
            $('#nameInput').focus();
            return;
        }

        // Gọi API chụp ảnh
        $.ajax({
            url: apiBase + "/capture",
            method: "GET",
            data: { name: name },
            success: function (response) {
                showToast("✅ Chụp ảnh thành công!", "success");
                // Làm input readonly và bật nút Dừng chụp
                $('#nameInput').prop('readonly', true);
                $('#stopCaptureBtn').prop('disabled', false);
                isChanged = true;
            },
            error: function () {
                showToast("❌ Lỗi khi chụp ảnh!", "error");
            }
        });
    });

    $('#stopCaptureBtn').click(function () {
        // Reset input
        $('#nameInput').val('').prop('readonly', false);
        isChanged = true;
        $('#stopCaptureBtn').prop('disabled', true);
    });
    $('#backBtn').click(function () {
        window.location.href = '/';
        if (isChanged) {
            $.ajax({
                url: apiBase + "/training",
                method: "GET",
                success: function (response) {
                    showToast("✅ Đã bắt đầu huấn luyện!");
                },
            });
        }
    });
});

const showToast = (message, type = "success") => {
    let backgroundColor;

    switch (type) {
        case "success":
            backgroundColor = "linear-gradient(to right, #00b09b, #96c93d)";
            break;
        case "error":
            backgroundColor = "linear-gradient(to right, #e52d27, #b31217)";
            break;
        case "warning":
            backgroundColor = "linear-gradient(to right, #f7971e, #ffd200)";
            break;
        case "info":
        default:
            backgroundColor = "linear-gradient(to right, #2193b0, #6dd5ed)";
    }

    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        close: true,
        stopOnFocus: true,
        style: {
            background: backgroundColor,
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            fontSize: "16px",
        }
    }).showToast();
}
