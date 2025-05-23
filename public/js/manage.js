let isChanged = false;
$(document).ready(function () {
    const apiBase = localStorage.getItem('apiHost') || "http://192.168.1.223:8080";

    $('.delete-person').click(function () {
        const name = $(this).data('name');
        if (confirm(`Bạn có chắc muốn xoá "${name}" không?`)) {
            $.ajax({
                url: `${apiBase}/delete-person`,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ name }),
                success: function (res) {
                    isChanged = true;
                    showToast(res.message);
                    $(`button[data-name="${name}"]`).closest('li').remove(); // 🔥 Xoá phần tử giao diện
                    if ($('#personList li').length === 0) {
                        $('#personList').append('<li>Không có người nào.</li>');
                    }
                },
                error: function (err) {
                    showToast(err.responseJSON?.error || 'Xoá thất bại', 'error');
                }
            });
        }
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

