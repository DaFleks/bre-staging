"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import useModalsStore from "@/hooks/useModalsStore";

import { SendIcon, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Modal from "@/components/ui/modal";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(2),
  subject: z.string().min(5).max(100),
  message: z.string().min(1),
});

const ContactModal = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  //  Hooks
  const contactOpen = useModalsStore((state: any) => state.contactOpen);
  const contactToggle = useModalsStore((state: any) => state.contactToggle);

  //  Handlers
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Modal
      title="Contact"
      description="If you have any questions, feel free to send an email!"
      open={contactOpen}
      onOpenChange={contactToggle}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Required" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Required" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none h-[150px]"
                    placeholder="Type your message here.."
                    {...field}
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  We will get back to you as soon as we can.
                </p>
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-3 w-full">
            <Button
              variant="destructive"
              onClick={() => {
                form.reset();
              }}
            >
              <TrashIcon className="h-4 w-4" />
              &#160;&#160; Reset
            </Button>
            <Button type="submit">
              <SendIcon className="h-4 w-4" />
              &#160;&#160; Send Email
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
export default ContactModal;
