document.getElementById("submitBtn").addEventListener("click", async () => {
    const question = document.getElementById("questionInput").value;
    const fileInput = document.getElementById("fileInput").files[0];

    if (!question || !fileInput) {
        alert("Please provide both a question and an Excel file.");
        return;
    }

    const formData = new FormData();
    formData.append("question", question);
    formData.append("file", fileInput);

    try {
        const response = await fetch("/ask_question/", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById("answerOutput").innerText = result.answer;
        } else {
            const errorText = await response.text();
            console.error("Error:", errorText);
            document.getElementById("answerOutput").innerText = "Error: " + errorText;
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("answerOutput").innerText = "Error: " + error.message;
    }
});
