let host = localStorage.getItem('apiHost') || "http://192.168.1.223:8080";
$('#ipInput').val(host.replace('http://', '')); // Hiển thị trong input

$(document).ready(function () {
    // Nếu người dùng thay đổi IP
    $('#setIpBtn').click(function () {
        const newIp = $('#ipInput').val().trim();
        if (newIp) {
            host = `http://${newIp}`;
            localStorage.setItem('apiHost', host);
            alert(`✅ Đã cập nhật IP server: ${host}`);
        }
    });


    $('.getlog').click(function () {
        const date = $('#datePicker').val().replaceAll('-', '');
        if (!date) {
            alert('Please select a date.');
            return;
        }

        $.ajax({
            url: `${host}/log?date=${date}`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                const tbody = $('#logTable tbody');
                tbody.empty();

                if (data.length === 0) {
                    tbody.append('<tr><td colspan="2">No records found.</td></tr>');
                } else {
                    data.forEach(entry => {
                        tbody.append(`<tr><td>${entry.name}</td><td>${entry.time}</td></tr>`);
                    });
                }
            },
            error: function () {
                alert('Error fetching data.');
            }
        });
    });

    $('.add-user').click(function () {
        window.location.href = '/capture';
    });
    $('.manage-users').click(function () {
        const encodedHost = encodeURIComponent(host);
        window.location.href = `/manage?host=${encodedHost}`;
    });

});
