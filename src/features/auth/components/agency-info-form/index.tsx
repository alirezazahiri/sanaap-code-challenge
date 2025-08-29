"use client";

import { FormTextInput } from "@/components/shared";
import { Button } from "@/components/ui";
import { AgencyType } from "@/enums/agency-type.enum";
import {
  useCheckAgentCode,
  useGetCounties,
  useGetInsuranceBranches,
  useGetProvinces,
} from "@/features/auth/api";
import { useForm } from "react-hook-form";
import { agencyInfoSchema, AgencyInfoSchema } from "@/features/auth/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AgentCodeField } from "@/features/auth/components/agent-code-field";
import { LocationFields } from "@/features/auth/components/agency-location-fields";
import { AgencyTypeField } from "@/features/auth/components/agency-type-field";
import { PhoneField } from "@/features/auth/components/agency-phone-field";
import classes from "./styles.module.css";
import { Problem } from "@/types/http-errors";
import { useState } from "react";
import { toast } from "sonner";
import { useActionMutation } from "@/hooks";
import { signUpAction } from "../../actions";
import { PATHS } from "@/routes/paths";
import { useRouter } from "next/navigation";

type AgencyInfoFormProps = {
  phone: string;
  firstName: string;
  lastName: string;
};

export const AgencyInfoForm: React.FC<AgencyInfoFormProps> = ({
  phone,
  firstName,
  lastName,
}) => {
  "use no memo";

  const router = useRouter();

  const { mutate: signUp, isPending: isSigningUp } = useActionMutation(
    signUpAction,
    {
      onSuccess: (data) => {
        router.push(PATHS.USER_STATUS);
      },
      onError: (_, error) => {
        toast.error(error);
      },
    }
  );

  const [agentCodeError, setAgentCodeError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<AgencyInfoSchema>({
    resolver: zodResolver(agencyInfoSchema),
    defaultValues: {
      agentCode: "",
      province: 0,
      city: 0,
      insuranceBranch: 0,
      telephone: "",
      agencyType: AgencyType.REAL,
      agencyName: "",
    },
    mode: "onChange",
  });

  const selectedProvince = watch("province");
  const selectedAgencyType = watch("agencyType");
  watch("agentCode");

  const {
    mutate: checkAgentCode,
    isPending: isCheckingAgentCode,
    isSuccess: isAgentCodeValid,
  } = useCheckAgentCode();

  const { data: provinces = [] } = useGetProvinces();
  const { data: counties = [] } = useGetCounties({
    province: selectedProvince,
  });
  const { data: insuranceBranches = [] } = useGetInsuranceBranches({
    province: selectedProvince,
  });

  const handleAgentCodeValidation = (code: string) => {
    setValue("agentCode", code);

    setAgentCodeError(null);

    checkAgentCode(
      { agent_code: code },
      {
        onError: (err) => {
          const error = err as unknown as Problem;
          setAgentCodeError(error.detail || "خطا در تأیید کد نمایندگی");
        },
        onSuccess: () => {
          setAgentCodeError(null);
        },
      }
    );
  };

  const handlePhoneChange = (value: string) => {
    setValue("telephone", value);
  };

  const handleAgencyTypeChange = (type: AgencyType) => {
    setValue("agencyType", type);
  };

  const onSubmit = (data: AgencyInfoSchema) => {
    if (agentCodeError) {
      toast.error("کد نمایندگی معتبر نیست");
      return;
    }

    if (!isAgentCodeValid) {
      setAgentCodeError("لطفاً کد نمایندگی را تأیید کنید");
      return;
    }

    signUp({
      ...data,
      firstName,
      lastName,
      phone,
    });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <AgentCodeField
        register={register}
        error={agentCodeError || errors.agentCode?.message}
        onValidate={handleAgentCodeValidation}
        isValidating={isCheckingAgentCode}
        isValid={isAgentCodeValid}
      />

      <LocationFields
        register={register}
        errors={errors}
        selectedProvince={selectedProvince}
        provinces={provinces}
        counties={counties}
        insuranceBranches={insuranceBranches}
      />

      <PhoneField
        control={control}
        error={errors.telephone?.message}
        onPhoneChange={handlePhoneChange}
      />

      <AgencyTypeField
        register={register}
        selectedType={selectedAgencyType}
        onTypeChange={handleAgencyTypeChange}
      />

      {selectedAgencyType === AgencyType.LEGAL && (
        <FormTextInput
          placeholder="نام نمایندگی را وارد کنید"
          label="نام نمایندگی"
          {...register("agencyName")}
          error={errors.agencyName?.message}
          fullWidth
        />
      )}

      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        fullWidth
        loading={isSigningUp}
      >
        ادامه
      </Button>
    </form>
  );
};
