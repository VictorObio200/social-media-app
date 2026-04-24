console.log("Script loaded");

async function testConnection() {
    const { data, error } = await supabaseClient.from("posts").select("*");

    if (error) {
        console.error("ERROR:", error);
    } else {
        console.log("SUCCESS:", data);
    }
}

testConnection();

document.getElementById("postForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const content = document.getElementById("content").value;

    const { error } = await supabaseClient
        .from("posts")
        .insert([{ user_id: 1, content: content }]);

    if (error) {
        console.error(error);
        alert("Error adding post");
    } else {
        alert("Post added!");
    }
});

async function loadPosts() {
    const { data, error } = await supabaseClient
        .from("posts")
        .select("*");

    if (error) {
        console.error(error);
        return;
    }

    const container = document.getElementById("postsContainer");

    if (!container) return;

    container.innerHTML = "";

    data.forEach(post => {
        const div = document.createElement("div");

        div.innerHTML = `
            <p>${post.content}</p>
            <button onclick="deletePost(${post.id})">Delete</button>
            <hr>
        `;

        container.appendChild(div);
    });
}

loadPosts();

async function deletePost(id) {
    const { error } = await supabaseClient
        .from("posts")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        alert("Error deleting post");
    } else {
        alert("Post deleted!");
        loadPosts(); // refresh list
    }
}