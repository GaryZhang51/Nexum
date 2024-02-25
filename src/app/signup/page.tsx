"use client";

import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { Button } from "@radix-ui/themes";
import { redirect } from "next/navigation";

const Signup = () => {
    const [serverErrors, setServerErrors] = useState("");

    return (
        <main className="flex justify-center items-center h-screen">
            <Form.Root
                className="flex flex-col justify-center border p-8 gap-4 h-fit rounded min-w-[400px]"
                onSubmit={(e) => {
                    const data = Object.fromEntries(
                        new FormData(e.currentTarget)
                    );

                    fetch(window.location.origin + "/api/signup", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: data.name,
                            email: data.email,
                            password: data.password,
                        }),
                    })
                        .then(() => {
                            redirect("localhost:3000");
                        })
                        .catch((errors) => setServerErrors(errors.message));
                }}
            >
                <Form.Field name="name">
                    <div className="flex justify-between w-full">
                        <Form.Label className="font-bold text-xl">
                            Name
                        </Form.Label>
                        <Form.Message match="valueMissing">
                            Please enter your name.
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input
                            className="px-4 py-2 w-full mt-1"
                            type="text"
                            required
                            placeholder="Enter name."
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field name="email" serverInvalid={serverErrors != ""}>
                    <div className="flex justify-between w-full">
                        <Form.Label className="font-bold text-xl">
                            Email
                        </Form.Label>
                        <Form.Message match="valueMissing">
                            Please enter your email.
                        </Form.Message>
                        <Form.Message match="typeMismatch">
                            Please provide a valid email.
                        </Form.Message>
                        {serverErrors != "" && (
                            <Form.Message>Email already in use.</Form.Message>
                        )}
                    </div>
                    <Form.Control asChild>
                        <input
                            className="px-4 py-2 w-full mt-1"
                            type="email"
                            required
                            placeholder="Enter email."
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field name="password">
                    <div className="flex justify-between w-full">
                        <Form.Label className="font-bold text-xl">
                            Password
                        </Form.Label>
                        <Form.Message match="valueMissing">
                            Please enter a password.
                        </Form.Message>
                        <Form.Message match="tooShort">
                            Your password must be longer than 8 characters.
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input
                            className="px-4 py-2 w-full mt-1"
                            type="password"
                            required
                            minLength={8}
                            placeholder="Enter password."
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Submit asChild>
                    <Button className="!text-lg !p-5">Sign up</Button>
                </Form.Submit>
            </Form.Root>
        </main>
    );
};

export default Signup;
