'use client';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Alert, Snackbar, Typography } from '@mui/material';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Checkbox } from '../../../components/ui/checkbox';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const formSchema = z.object({
  firstname: z.string().min(2),
  lastname: z.string().min(2),
  email: z.string().email(),

  message: z.string(),
  check: z.boolean(),
});
function ContactForm() {
  // const [firstname, setFirstname] = useState();
  // const [lastname, setLastname] = useState();
  // const [email, setEmail] = useState();
  // const [subject, setEmail] = useState();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const handleSnackbarClose = () => {
    setOpenSnackBar(false);
  };
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  // useEffect(() => {
  //   const subscription = form.watch((value, { name, type }) => {
  //     console.log(value);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [form.watch]);

  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    if (!values.check) {
      return form.setError('check', { message: 'This needs to be checked' });
    }

    var myHeaders = new Headers();
    myHeaders.append('x-api-key', '449772DE-2780-4412-B9F7-E49E48605875');
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      firstname: values.firstname,
      lastname: values.lastname,
      enquiryEmail: values.email,
      enquiryMessage: values.message,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'https://api.lawinzo.com/node/api/v1/contrakt/enquiry',
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setOpenSnackBar(true);
        console.log(result);
        form.reset();
        form.setValue('firstname', '');
        form.setValue('lastname', '');
        form.setValue('email', '');
        form.setValue('message', '');
        form.setValue('check', false);
      })
      .catch((error) => console.log('error', error));
  }

  return (
    <>
      {openSnackBar && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={openSnackBar}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          sx={{ zIndex: 1000, mt: 10 }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={'success'}
            sx={{ width: '100%', pr: 3, pl: 3, borderRadius: '10px' }}
          >
            <Typography sx={{ fontSize: '14px' }} variant="h6">
              {
                'We received your request, our team will review and get back to you with in the next few hours.'
              }
            </Typography>
          </Alert>
        </Snackbar>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 flex flex-col"
        >
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  First Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl className="mt-1">
                  <Input
                    className="bg-white"
                    placeholder="First Name"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Last Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    placeholder="Last Name"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input className="bg-white" placeholder="Email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {/* <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="I have question about...." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
             
            </FormItem>
          )}
        /> */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Message <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Message"
                    className="resize-none h-40 bg-white"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="check"
            render={({ field }) => (
              <FormItem className="">
                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I agree to receive the occasional communications &
                      insights from easedraft.com, and am aware that I can
                      unsubscribe any time.
                    </FormLabel>
                  </div>
                </div>
              </FormItem>
            )}
          />
          <p>
            We process your data safely and strive to only deliver relevant
            content that makes your eyes sparkle. Please review our Privacy
            Policy for more info on our data processing.
          </p>
          <Button type="submit" size="lg" className="mt-10">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}

export default ContactForm;
