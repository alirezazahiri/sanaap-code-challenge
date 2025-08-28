"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  userInfoSchema,
  type UserInfoSchema,
} from "@/features/auth/validation";
import classes from "./styles.module.css";
import { Button } from "@/components/ui";
import { FormTextInput } from "@/components/shared";
import { useRouter } from "next/navigation";
import { PATHS } from "@/routes/paths";

export const UserInfoForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfoSchema>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = (data: UserInfoSchema) => {
    const { firstName, lastName } = data;
    const queryParams = new URLSearchParams();
    queryParams.set("firstName", firstName);
    queryParams.set("lastName", lastName);
    router.push(`${PATHS.AUTH.SIGNUP.AGENCY_INFO}?${queryParams.toString()}`);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <FormTextInput
        label="نام"
        {...register("firstName")}
        error={errors.firstName?.message}
        fullWidth
        placeholder="نام را وارد کنید"
      />
      <FormTextInput
        label="نام خانوادگی"
        {...register("lastName")}
        error={errors.lastName?.message}
        fullWidth
        placeholder="نام خانوادگی را وارد کنید"
      />

      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        fullWidth
      >
        ادامه
      </Button>
    </form>
  );
};
