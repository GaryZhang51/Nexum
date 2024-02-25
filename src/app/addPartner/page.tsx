"use client"

import React, { useState }  from 'react';
import * as Form from '@radix-ui/react-form';
import { Button } from '@radix-ui/themes';

const addPartner = () => {    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [website, setWebsite] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoading, setIsLoading] = useState("")

    const handleFormSubmit = async () => {
        if (!email || !description) return;
        try {
          const response = await fetch('/api/partners', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name,
              email,
              description,
              location,
              website,
              phoneNumber
            }),
          });
    
          if (response.ok) {
            console.log('Partner added successfully');
            setName("")
            setEmail("")
            setDescription("")
            setLocation("")
            setWebsite("")
            setPhoneNumber("")
            setIsLoading("")
          } else {
            console.error('Error adding partner:', response.status, response.statusText);
          }
        } catch (error: any) {
          console.error('Error adding partner:', error.message);
        }
    }

    return (
        <main className='flex justify-center items-center h-screen'>
            <Form.Root className='flex flex-col justify-center border p-8 gap-4 h-fit rounded min-w-[400px]'>
            <h1 className="font-bold text-2xl text-center">Add a Partner</h1>
            <Form.Field name="name">
                <div className="flex justify-between w-full">
                    <Form.Message match="valueMissing">
                        Please enter the name

                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input onChange={(e) => setName(e.target.value)} className="px-4 py-2 w-full mt-1" type="name" required placeholder="Name" />
                </Form.Control>
            </Form.Field>
                
            <Form.Field name="email">
                <div className="flex justify-between w-full">
                    <Form.Message match="valueMissing">
                        Please enter your email.
                    </Form.Message>
                    <Form.Message match="typeMismatch">
                        Please provide a valid email.
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input onChange={(e) => setEmail(e.target.value)} className="px-4 py-2 w-full mt-1" type="email" required placeholder="Email" />
                </Form.Control>
            </Form.Field>
            
            <Form.Field name="description">
                <div className="flex justify-between w-full">
                    <Form.Message match="valueMissing">
                        Please enter a description.
                    </Form.Message> 
                </div>
                <Form.Control asChild>
                    <input onChange={(e) => setDescription(e.target.value)} className="px-4 py-2 w-full mt-1" type="description" required placeholder="Description" />
                </Form.Control> 
            </Form.Field>

            <Form.Field name="location">
                <div className="flex justify-between w-full">
                </div>
            <Form.Control asChild>
                <input onChange={(e) => setLocation(e.target.value)} className="px-4 py-2 w-full mt-1" type="location" placeholder="Location" />
            </Form.Control> 
            </Form.Field>

            <Form.Field name="website">
                <div className="flex justify-between w-full">
                </div>
                <Form.Control asChild>
                    <input onChange={(e) => setWebsite(e.target.value)} className="px-4 py-2 w-full mt-1" type="website" placeholder="Website" />
                </Form.Control> 
            </Form.Field>

            <Form.Field name="phoneNumber">
                <Form.Control asChild>
                    <input onChange={(e) => setPhoneNumber(e.target.value)} className="px-4 py-2 w-full mt-1" type="phoneNumber" placeholder="Phone Number" />
                </Form.Control> 
            </Form.Field>

            <Form.Submit asChild>
                <Button className='!text-lg !p-5' onClick={handleFormSubmit} disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
            </Form.Submit>
            
            </Form.Root>
        </main>
    )
};

export default addPartner;