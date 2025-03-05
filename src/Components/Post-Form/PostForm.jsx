import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (!userData || !userData.$id) {
            console.error("Error: userData is undefined or missing $id");
            return;
        }
    
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
    
            if (file && post.featuredImage) {
                await appwriteService.deleteFile(post.featuredImage);
            }
    
            if (post.$id) {
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });
    
                if (dbPost && dbPost.$id) {
                    navigate(`/post/${dbPost.$id}`);
                } else {
                    console.error("Error: dbPost is undefined or missing $id");
                }
            } else {
                console.error("Error: post.$id is undefined");
            }
        } else {
            if (!data.image || !data.image[0]) {
                console.error("Error: No image selected for upload");
                return;
            }
    
            const file = await appwriteService.uploadFile(data.image[0]);
    
            if (file && file.$id) {
                data.featuredImage = file.$id;
    
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
                console.log("Created Post Response:", dbPost);
    
                if (dbPost && dbPost.$id) {
                    navigate(`/post/${dbPost.$id}`);
                } else {
                    console.error("Error: dbPost is undefined or missing $id");
                }
            } else {
                console.error("Error: File upload failed or file is undefined");
            }
        }
    };
    

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <div className="inline-block pl-1 mb-1">Content :</div>
                <textarea label="Content :" name="content" className="h-28 resize-none px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-300 duration-200 border-2 border-gray-700 w-full" placeholder="Content" {...register("content", { required: true })} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} textColor={post ? "text-black" : "text-gray-400"} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}