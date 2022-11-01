import { StatusCodes } from "http-status-codes";
import Redis from "ioredis";
import { nanoid } from "nanoid";
import supertest from "supertest";
import { object } from "zod";
import * as postService from "../services/post.service";
import * as itemService from "../services/item.service";
import { createServer } from "../utils/server";

const app = createServer();

const postId = `post_${nanoid()}`;

describe("post", () => {
    describe("getPostHandler", () => {
        describe("post not available", () => {
            it("should return 404 status code", async() => {
                const findPostServiceMock = jest.spyOn(postService, "findPost")
                // @ts-ignore
                .mockReturnValueOnce({});
                const updatePostServiceMock = jest.spyOn(postService, "updatePost")
                // @ts-ignore
                .mockReturnValueOnce({});

                const { statusCode} = await supertest(app).get("/api/posts/1000");

                expect(findPostServiceMock).toHaveBeenCalled();
                expect(updatePostServiceMock).not.toHaveBeenCalled();
                expect(statusCode).toBe(StatusCodes.NOT_FOUND);
            })
        })

        describe("post is available", () => {
            it("should return 200 status code", async() => {
                const createItemServiceMock = jest.spyOn(itemService, "createItem")
                // @ts-ignore
                .mockReturnValueOnce({});
                const createPostServiceMock = jest.spyOn(postService, "createPost")
                // @ts-ignore
                .mockReturnValueOnce({});
                const findPostServiceMock = jest.spyOn(postService, "findPost")
                // @ts-ignore
                .mockReturnValueOnce({});
                const updatePostServiceMock = jest.spyOn(postService, "updatePost")
                // @ts-ignore
                .mockReturnValueOnce({});

                const {statusCode} = await supertest(app).get("/api/posts/1000");

                expect(createItemServiceMock).toHaveBeenCalled();
                expect(createPostServiceMock).toHaveBeenCalled();
                expect(findPostServiceMock).toHaveBeenCalled();
                expect(updatePostServiceMock).toHaveBeenCalled();
                expect(statusCode).toBe(StatusCodes.OK);
            });
        });
    });
    
    describe("getPostsHandler", () => {
        describe("posts length equals 0", () => {
            it("should return 404 status code", async() => {
                const findPostsServiceMock = jest.spyOn(postService, "findPosts")
                // @ts-ignore
                .mockReturnValueOnce({});

                const { statusCode} = await supertest(app).get("/api/posts");

                expect(findPostsServiceMock).toHaveBeenCalled();
                expect(statusCode).toBe(StatusCodes.NOT_FOUND);
            })
        })

        describe("posts length not equal to 0", () => {
            it("should return 200 status code", async() => {
                const findPostsServiceMock = jest.spyOn(postService, "findPosts")
                // @ts-ignore
                .mockReturnValueOnce({});

                const { statusCode} = await supertest(app).get("/api/posts");

                expect(findPostsServiceMock).toHaveBeenCalled();
                expect(statusCode).toBe(StatusCodes.OK);
            })
        })
    });

    describe("deletePostHandler", () => {
        describe("post not available", () => {
            it("should return 404 status code", async() => {
                const findPostServiceMock = jest.spyOn(postService, "findPost")
                // @ts-ignore
                .mockReturnValueOnce({});
                const deletePostServiceMock = jest.spyOn(postService, "deletePost")
                // @ts-ignore
                .mockReturnValueOnce({});

                const { statusCode} = await supertest(app).get("/api/posts/1000");

                expect(findPostServiceMock).toHaveBeenCalled();
                expect(deletePostServiceMock).not.toHaveBeenCalled();
                expect(statusCode).toBe(StatusCodes.NOT_FOUND);
            });
        });
    });
    describe("createUserSessionHandler", () => {});
});