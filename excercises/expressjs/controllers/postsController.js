let posts = [
	{ id: 1, title: "Post One" },
	{ id: 2, title: "Post Two" },
	{ id: 3, title: "Post Three" },
];

export const getPost = (request, response, next) => {

	const id = parseInt(request.params.id);

	if (isNaN(id) || id < 0) {
		const err = new Error("invalid id");
		err.status = 400;
		return next(err);
	}

	const post = posts.filter((post) => post.id === id);

	if (post.length === 0) {
		const err = new Error("post not found");
		err.status = 404;
		return next(err);
	}

	response.status(200).json(post);
}

export const getPosts = (request, response, next) => {
	return response.status(200).json(posts);
}

export const createPost = (request, response, next) => {

	if (!request.body) {
		const error = new Error("invalid message body");
		error.status = 400;
		return next(error);
	}

	if (!request.body.title) {
		const error = new Error("message body should include a title");
		error.status = 400;
		return next(error);
	}

	const post = {
		id: posts.length + 1,
		title: request.body.title
	};

	posts.push(post);

	return response.status(200).json({
		msg: "success"
	})

}

export const updatePost = (request, response, next) => {
	if (!request.body) {
		const error = new Error("invalid message body");
		error.status = 400;
		next(error);
	}

	const title = request.body.title;

	if (!title) {
		const error = new Error("message body should include a title");
		error.status = 400;
		return next(error);
	}

	const id = parseInt(request.params.id);

	if (isNaN(id) || id < 0) {
		const error = new Error("invalid id");
		error.status = 400;
		return next(error);
	}

	const post = posts.find((post) => post.id === id);

	if (!post) {
		const error = new Error("post not found");
		error.status = 404;
		return next(error);
	}

	post.title = title;

	return response.status(200).json({
		msg: "success"
	});

}

export const deletePost = (request, response, next) => {

	const id = parseInt(request.params.id);

	if (isNaN(id) || id < 0) {
		const error = new Error("invalid id");
		error.status = 400;
		return next(error);
	}

	const post = posts.find((post) => post.id === id);

	if (!post) {
		const error = new Error("post not found");
		error.status = 404;
		return next(error);
	}

	posts = posts.filter((post) => post.id !== id);

	return response.status(200).json({
		msg: "success"
	});

}

