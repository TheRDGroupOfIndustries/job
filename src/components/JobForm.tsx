"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import BtnLoader from "./BtnLoader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function JobForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      designation: "",
      employmentType: "full-time",
      keySkills: ["", ""],
      skills: ["", ""],
      department: "",
      roleCategory: "",
      workMode: "in-office",
      location: ["", "", ""],
      willingToRelocate: false,
      workExperience: {
        min: 0,
        max: 0,
      },
      annualSalary: {
        min: 0,
        max: 0,
        currency: "INR",
        hideFromCandidates: false,
      },
      companyIndustry: "",
      educationQualification: "",
      candidateIndustry: "",
      diversityHiring: {
        women: false,
        womenReturning: false,
        exDefence: false,
        differentlyAbled: false,
      },
      companyDetails: {
        name: "",
        established: 0,
        sector: "",
        locatedAt: "",
      },
      jobDescription: "",
      vacancy: 1,
    },
  });
  const { userData } = useSelector((state: RootState) => state.auth);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [creatingJob, setCreatingJob] = useState(false);

  const {
    fields: keySkillsFields,
    append: appendKeySkill,
    remove: removeKeySkill,
  } = useFieldArray({
    control,
    name: "keySkills" as never,
  });

  const {
    fields: skillsFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: "skills" as never,
  });

  const {
    fields: locationFields,
    append: appendLocation,
    remove: removeLocation,
  } = useFieldArray({
    control,
    name: "location" as never,
  });

  const onSubmit = async (data: any) => {
    // You can send the data to your backend API here
    setCreatingJob(true);
    data.createdBy = userData?.id || "";
    console.log("Job Data:", data);


    try {
      const res = await fetch("/api/job/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(res);
      if (!res.ok) {
        throw new Error("Job posting failed");
      }
      const responseData = await res.json();
      console.log(responseData);
      reset();
      setIsOpenForm(false);
    } catch (error) {
      console.error(error);
    } finally {
      setCreatingJob(false);
    }
  };

  const watchWillingToRelocate = watch("willingToRelocate");
  const watchDiversityHiring = watch("diversityHiring");

  return (
    <>
      <Button
        onClick={() => setIsOpenForm(true)}
        className="cursor-pointer text-card"
      >
        <Plus /> Post New Job
      </Button>
      {isOpenForm && (
        <div className="fixed inset-0 bg-secondary/50 z-50 flex items-center justify-center backdrop-blur-[6px]">
          <Card className="w-full max-w-4xl h-[90vh] shadow-lg rounded-2xl overflow-y-auto border-none">
            <CardHeader className="relative">
              <CardTitle className="text-3xl font-bold text-center">
                Post a New Job
              </CardTitle>
              <CardDescription className="text-center mt-2">
                Fill out the details below to create a new job posting.
              </CardDescription>
              <Button
                className="text-card rounded-full cursor-pointer absolute right-4 top-1/2 -translate-y-1/2"
                onClick={() => setIsOpenForm(false)}
              >
                <X />{" "}
              </Button>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="grid gap-8 p-6">
                <div className="grid gap-4">
                  <h2 className="text-xl font-semibold border-b pb-2">
                    Job Details
                  </h2>
                  <div className="grid gap-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      {...register("designation", {
                        required: "Designation is required",
                      })}
                      className="rounded-xl"
                    />
                    {errors.designation && (
                      <p className="text-sm text-red-500">
                        {errors.designation.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label>Employment Type</Label>
                    <RadioGroup className="flex flex-row space-x-4">
                      {["full-time", "part-time", "contract", "internship"].map(
                        (type) => (
                          <div
                            key={type}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={type}
                              id={`employmentType-${type}`}
                              {...register("employmentType")}
                            />
                            <Label
                              htmlFor={`employmentType-${type}`}
                              className="capitalize"
                            >
                              {type}
                            </Label>
                          </div>
                        )
                      )}
                    </RadioGroup>
                  </div>

                  <div className="grid gap-2">
                    <Label>Work Mode</Label>
                    <RadioGroup className="flex flex-row space-x-4">
                      {["in-office", "remote", "hybrid"].map((mode) => (
                        <div key={mode} className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={mode}
                            id={`workMode-${mode}`}
                            {...register("workMode")}
                          />
                          <Label
                            htmlFor={`workMode-${mode}`}
                            className="capitalize"
                          >
                            {mode}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="jobDescription">Job Description</Label>
                    <Textarea
                      id="jobDescription"
                      rows={5}
                      {...register("jobDescription", {
                        required: "Job description is required",
                      })}
                      className="rounded-xl"
                    />
                    {errors.jobDescription && (
                      <p className="text-sm text-red-500">
                        {errors.jobDescription.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        {...register("department", {
                          required: "Department is required",
                        })}
                        className="rounded-xl"
                      />
                      {errors.department && (
                        <p className="text-sm text-red-500">
                          {errors.department.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="roleCategory">Role Category</Label>
                      <Input
                        id="roleCategory"
                        {...register("roleCategory", {
                          required: "Role category is required",
                        })}
                        className="rounded-xl"
                      />
                      {errors.roleCategory && (
                        <p className="text-sm text-red-500">
                          {errors.roleCategory.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="educationQualification">
                      Education Qualification
                    </Label>
                    <Input
                      id="educationQualification"
                      {...register("educationQualification", {
                        required: "Education qualification is required",
                      })}
                      className="rounded-xl"
                    />
                    {errors.educationQualification && (
                      <p className="text-sm text-red-500">
                        {errors.educationQualification.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4">
                  <h2 className="text-xl font-semibold border-b pb-2">
                    Skills & Location
                  </h2>

                  <div className="grid gap-2">
                    <Label>Key Skills</Label>
                    {keySkillsFields.map((item, index) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <Input
                          placeholder="e.g., JavaScript"
                          className="rounded-xl"
                          {...register(`keySkills.${index}`, {
                            required: "Key skill is required",
                          })}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeKeySkill(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full mt-2 rounded-full"
                      onClick={() => appendKeySkill("")}
                    >
                      Add Key Skill
                    </Button>
                    {errors.keySkills && (
                      <p className="text-sm text-red-500">
                        Please add at least one key skill.
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label>Skills</Label>
                    {skillsFields.map((item, index) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <Input
                          placeholder="e.g., React, Node.js"
                          className="rounded-xl"
                          {...register(`skills.${index}`, {
                            required: "Skill is required",
                          })}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSkill(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full mt-2 rounded-full"
                      onClick={() => appendSkill("")}
                    >
                      Add Skill
                    </Button>
                    {errors.skills && (
                      <p className="text-sm text-red-500">
                        Please add at least one skill.
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label>Location (Max 3)</Label>
                    {locationFields.map((item, index) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <Input
                          placeholder="e.g., Bengaluru"
                          className="rounded-xl"
                          {...register(`location.${index}`, {
                            required: "Location is required",
                          })}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeLocation(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {locationFields.length < 3 && (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full mt-2 rounded-full"
                        onClick={() => appendLocation("")}
                      >
                        Add Location
                      </Button>
                    )}
                    {errors.location && (
                      <p className="text-sm text-red-500">
                        Please add at least one location (max 3).
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="willingToRelocate"
                      {...register("willingToRelocate")}
                      checked={watchWillingToRelocate}
                      onCheckedChange={(checked) =>
                        setValue("willingToRelocate", checked)
                      }
                    />
                    <Label htmlFor="willingToRelocate">
                      Willing to Relocate
                    </Label>
                  </div>
                </div>

                <div className="grid gap-4">
                  <h2 className="text-xl font-semibold border-b pb-2">
                    Experience & Salary
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="minWorkExperience">
                        Min. Work Experience (years)
                      </Label>
                      <Input
                        id="minWorkExperience"
                        type="number"
                        {...register("workExperience.min", {
                          required: "Min experience is required",
                          valueAsNumber: true,
                        })}
                        className="rounded-xl"
                      />
                      {errors.workExperience?.min && (
                        <p className="text-sm text-red-500">
                          {errors.workExperience.min.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="maxWorkExperience">
                        Max. Work Experience (years)
                      </Label>
                      <Input
                        id="maxWorkExperience"
                        type="number"
                        {...register("workExperience.max", {
                          required: "Max experience is required",
                          valueAsNumber: true,
                        })}
                        className="rounded-xl"
                      />
                      {errors.workExperience?.max && (
                        <p className="text-sm text-red-500">
                          {errors.workExperience.max.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="minSalary">Min. Annual Salary</Label>
                      <Input
                        id="minSalary"
                        type="number"
                        {...register("annualSalary.min", {
                          required: "Min salary is required",
                          valueAsNumber: true,
                        })}
                        className="rounded-xl"
                      />
                      {errors.annualSalary?.min && (
                        <p className="text-sm text-red-500">
                          {errors.annualSalary.min.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="maxSalary">Max. Annual Salary</Label>
                      <Input
                        id="maxSalary"
                        type="number"
                        {...register("annualSalary.max", {
                          required: "Max salary is required",
                          valueAsNumber: true,
                        })}
                        className="rounded-xl"
                      />
                      {errors.annualSalary?.max && (
                        <p className="text-sm text-red-500">
                          {errors.annualSalary.max.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <h2 className="text-xl font-semibold border-b pb-2">
                    Company & Diversity
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        {...register("companyDetails.name", {
                          required: "Company name is required",
                        })}
                        className="rounded-xl"
                      />
                      {errors.companyDetails?.name && (
                        <p className="text-sm text-red-500">
                          {errors.companyDetails.name.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="established">Established Year</Label>
                      <Input
                        id="established"
                        type="number"
                        {...register("companyDetails.established", {
                          required: "Established year is required",
                          valueAsNumber: true,
                        })}
                        className="rounded-xl"
                      />
                      {errors.companyDetails?.established && (
                        <p className="text-sm text-red-500">
                          {errors.companyDetails.established.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="sector">Sector</Label>
                      <Input
                        id="sector"
                        {...register("companyDetails.sector", {
                          required: "Sector is required",
                        })}
                        className="rounded-xl"
                      />
                      {errors.companyDetails?.sector && (
                        <p className="text-sm text-red-500">
                          {errors.companyDetails.sector.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="locatedAt">Located At</Label>
                      <Input
                        id="locatedAt"
                        {...register("companyDetails.locatedAt", {
                          required: "Location is required",
                        })}
                        className="rounded-xl"
                      />
                      {errors.companyDetails?.locatedAt && (
                        <p className="text-sm text-red-500">
                          {errors.companyDetails.locatedAt.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="companyIndustry">Company Industry</Label>
                    <Input
                      id="companyIndustry"
                      {...register("companyIndustry", {
                        required: "Company industry is required",
                      })}
                      className="rounded-xl"
                    />
                    {errors.companyIndustry && (
                      <p className="text-sm text-red-500">
                        {errors.companyIndustry.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="candidateIndustry">
                      Candidate Industry
                    </Label>
                    <Input
                      id="candidateIndustry"
                      {...register("candidateIndustry", {
                        required: "Candidate industry is required",
                      })}
                      className="rounded-xl"
                    />
                    {errors.candidateIndustry && (
                      <p className="text-sm text-red-500">
                        {errors.candidateIndustry.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4">
                  <h2 className="text-xl font-semibold border-b pb-2">
                    Diversity Hiring
                  </h2>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="women"
                        {...register("diversityHiring.women")}
                        checked={watchDiversityHiring.women}
                        onCheckedChange={(checked) =>
                          setValue("diversityHiring.women", checked)
                        }
                      />
                      <Label htmlFor="women">Women</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="womenReturning"
                        {...register("diversityHiring.womenReturning")}
                        checked={watchDiversityHiring.womenReturning}
                        onCheckedChange={(checked) =>
                          setValue("diversityHiring.womenReturning", checked)
                        }
                      />
                      <Label htmlFor="womenReturning">Women Returning</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="exDefence"
                        {...register("diversityHiring.exDefence")}
                        checked={watchDiversityHiring.exDefence}
                        onCheckedChange={(checked) =>
                          setValue("diversityHiring.exDefence", checked)
                        }
                      />
                      <Label htmlFor="exDefence">Ex-Defence</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="differentlyAbled"
                        {...register("diversityHiring.differentlyAbled")}
                        checked={watchDiversityHiring.differentlyAbled}
                        onCheckedChange={(checked) =>
                          setValue("diversityHiring.differentlyAbled", checked)
                        }
                      />
                      <Label htmlFor="differentlyAbled">
                        Differently Abled
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="vacancy">Vacancy</Label>
                  <Input
                    id="vacancy"
                    type="number"
                    {...register("vacancy", {
                      required: "Vacancy is required",
                      valueAsNumber: true,
                    })}
                    className="rounded-xl"
                  />
                  {errors.vacancy && (
                    <p className="text-sm text-red-500">
                      {errors.vacancy.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button className="w-full rounded-full" type="submit">
                  {creatingJob ? <BtnLoader /> : "Post Job"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}
    </>
  );
}
