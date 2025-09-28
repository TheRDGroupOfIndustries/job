"use client";

// New imports for image upload logic
import { useRef, useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2, X, Plus } from "lucide-react";
import BtnLoader from "./BtnLoader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IJob } from "@/models/Job";
import { createJob, updateJob } from "@/redux/features/jobSlice";
import toast from "react-hot-toast";


// Cloudinary config (replace with your values)
const CLOUD_NAME = "YOUR_CLOUD_NAME";
const UPLOAD_PRESET = "YOUR_UPLOAD_PRESET";

// Updated type: companyDetails.image is optional string
interface FormData {
  designation: string;
  employmentType: string;
  keySkills: string[];
  skills: string[];
  department: string;
  roleCategory: string;
  workMode: string;
  location: string[];
  willingToRelocate: boolean;
  workExperience: {
    min: number;
    max: number;
  };
  annualSalary: {
    min: number;
    max: number;
    currency: string;
    hideFromCandidates: boolean;
  };
  companyIndustry: string;
  educationQualification: string;
  candidateIndustry: string;
  diversityHiring: {
    women: boolean;
    womenReturning: boolean;
    exDefence: boolean;
    differentlyAbled: boolean;
  };
  companyDetails: {
    name: string;
    established: string;
    sector: string;
    locatedAt: string;
    image?: string; // newly added field
  };
  jobDescription: string;
  vacancy: number;
  createdBy?: string;
}

export default function JobForm({
  mode = "create",
  close,
  jobId,
}: {
  mode?: "create" | "update";
  close: () => void;
  jobId?: string;
}) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    trigger,
  } = useForm<FormData>({
    defaultValues: {
      designation: "",
      employmentType: "",
      keySkills: [""],
      skills: [""],
      department: "",
      roleCategory: "",
      workMode: "",
      location: [""],
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
        established: "",
        sector: "",
        locatedAt: "",
        image: "", // new default value for image
      },
      jobDescription: "",
      vacancy: 0,
    },
    mode: "onChange",
  });

  const { userData } = useSelector((state: RootState) => state.auth);
  const { jobs } = useSelector((state: RootState) => state.job);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false); // new state for upload UI

  const dispatch = useDispatch();

  useEffect(() => {
    if (mode === "update" && jobId) {
      const job = jobs.find((j) => j._id === jobId);
      if (job) {
        reset(job as any);
      }
    }
  }, [mode, jobId, jobs, reset]);

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

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    data.createdBy = userData?._id || "";

    data.keySkills = data.keySkills.filter(skill => skill.trim() !== "");
    data.skills = data.skills.filter(skill => skill.trim() !== "");
    data.location = data.location.filter(loc => loc.trim() !== "");

    if (data.keySkills.length === 0) {
      toast.error("Please add at least one key skill");
      setLoading(false);
      return;
    }
    if (data.skills.length === 0) {
      toast.error("Please add at least one skill");
      setLoading(false);
      return;
    }
    if (data.location.length === 0) {
      toast.error("Please add at least one location");
      setLoading(false);
      return;
    }

    if (mode === "update" && jobId) {
      toast.loading("Updating Job...", { id: "update-job" });
      dispatch(updateJob(data as any) as any)
        .unwrap()
        .then((res: { message: string; job: IJob }) => {
          toast.success("Job Updated Successfully", { id: "update-job" });
          reset();
          close();
        })
        .catch((err: any) => {
          toast.error("Error Updating Job", { id: "update-job" });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.loading("Creating Job...", { id: "create-job" });
      dispatch(createJob(data as any) as any)
        .unwrap()
        .then((res: { message: string; job: IJob }) => {
          toast.success("Job Created Successfully", { id: "create-job" });
          reset();
          close();
        })
        .catch((err: any) => {
          toast.error("Error Creating Job", { id: "create-job" });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const watchWillingToRelocate = watch("willingToRelocate");
  const watchDiversityHiring = watch("diversityHiring");
  const watchCompanyImage = watch("companyDetails.image"); // new watcher

  // Handle company logo file upload to Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  setImageUploading(true);
  const formData = new FormData();
  formData.append("file", file);
  // Ensure UPLOAD_PRESET is a string, even if env var is missing
  formData.append("upload_preset", UPLOAD_PRESET || ""); 

  // You might want to log these for debugging if needed
  // console.log("Uploading file:", file.name);
  // console.log("Using Cloudinary URL:", `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`);
  // console.log("Using Upload Preset:", UPLOAD_PRESET || "");


  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
        // For FormData, fetch automatically sets the 'Content-Type' header with the correct boundary.
        // Explicitly setting it can sometimes cause issues.
      }
    );

    // Check if the HTTP response status is in the 2xx range (success)
    if (!res.ok) { 
      const errorResponseText = await res.text(); // Get the raw error message from Cloudinary
      console.error("Cloudinary upload failed with status:", res.status, "Response:", errorResponseText);
      // Display a user-friendly error, potentially truncating the raw response if it's too long
      toast.error(`Image upload failed: ${res.status} - ${errorResponseText.substring(0, 100)}...`); 
      setImageUploading(false); // Make sure to reset loading state on error before returning
      return; // Stop execution if the response was not OK
    }

    const data = await res.json(); // Parse the successful JSON response
    // console.log("Cloudinary response data:", data); // Log full response for debugging

    if (data.secure_url) {
      // Assuming setValue is from react-hook-form or similar
      setValue("companyDetails.image", data.secure_url, { shouldValidate: true });
      toast.success("Image uploaded!");
    } else {
      console.error("Cloudinary response missing secure_url:", data);
      toast.error("Image upload failed: No secure_url found in response.");
    }
  } catch (error) { // Catch network errors or issues parsing JSON from a successful response
    console.error("Image upload fetch error:", error);
    toast.error("Image upload error: Check network or server configuration.");
  } finally {
    setImageUploading(false); // Ensure loading state is always reset
  }
};


  return (
    <div className="fixed inset-0 bg-secondary/50 z-50 flex items-center justify-center backdrop-blur-[6px]">
      <Card className="w-full max-w-4xl h-[90vh] shadow-lg rounded-2xl overflow-y-auto border-none">
        <CardHeader className="relative flex-row flex justify-between items-center p-6 pb-2">
          <CardTitle className="text-2xl font-bold capitalize">
            {mode} a Job Post
          </CardTitle>
          <Button
            className="text-white rounded-full p-0 w-8 h-8 bg-primary hover:bg-primary-hover cursor-pointer hover:scale-110 transition-all duration-300"
            onClick={() => {
              close();
              reset();
            }}
            size="icon"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-8 p-6 pt-0">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  placeholder="e.g., Senior Frontend Developer"
                  {...register("designation", {
                    required: "Designation is required",
                    minLength: {
                      value: 2,
                      message: "Designation must be at least 2 characters"
                    }
                  })}
                  className={`rounded-xl bg-gray-100 border-none h-12 ${
                    errors.designation ? "border-red-500" : ""
                  }`}
                />
                {errors.designation && (
                  <p className="text-sm text-red-500">
                    {errors.jobDescription.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Employment Type</Label>
                <div className="flex flex-row space-x-4">
                  {["full-time", "part-time", "contract", "internship"].map(
                    (type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`employmentType-${type}`}
                          value={type}
                          {...register("employmentType", {
                            required: "Employment type is required",
                          })}
                          className="appearance-none w-4 h-4 rounded-full border-2 border-secondary p-px checked:bg-orange-500 checked:border-orange-500 cursor-pointer transition duration-200"
                        />
                        <Label
                          htmlFor={`employmentType-${type}`}
                          className="capitalize cursor-pointer"
                        >
                          {type}
                        </Label>
                      </div>
                    )
                  )}
                </div>
                {errors.employmentType && (
                  <p className="text-sm text-red-500">
                    {getErrorMessage(errors.employmentType)}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Work Mode</Label>
                <div className="flex flex-row space-x-4">
                  {["in-office", "remote", "hybrid"].map((mode) => (
                    <div key={mode} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`workMode-${mode}`}
                        value={mode}
                        {...register("workMode", {
                          required: "Work mode is required",
                        })}
                        className="appearance-none w-4 h-4 rounded-full border-2 border-secondary p-px checked:bg-orange-500 checked:border-orange-500 cursor-pointer transition duration-200"
                      />
                      <Label
                        htmlFor={`workMode-${mode}`}
                        className="capitalize cursor-pointer"
                      >
                        {mode}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.workMode && (
                  <p className="text-sm text-red-500">
                    {getErrorMessage(errors.workMode)}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="jobDescription">Job Description</Label>
                <Textarea
                  id="jobDescription"
                  rows={5}
                  placeholder="e.g., We are looking for a highly skilled Senior Frontend Developer..."
                  {...register("jobDescription", {
                    required: "Job description is required",
                    minLength: {
                      value: 10,
                      message: "Job description must be at least 10 characters"
                    }
                  })}
                  className={`rounded-xl bg-gray-100 border-none ${
                    errors.jobDescription ? "border-red-500" : ""
                  }`}
                />
                {errors.jobDescription && (
                  <p className="text-sm text-red-500">
                    {getErrorMessage(errors.jobDescription)}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    placeholder="e.g., Engineering"
                    {...register("department", {
                      required: "Department is required",
                    })}
                    className={`rounded-xl bg-gray-100 border-none h-12 ${
                      errors.department ? "border-red-500" : ""
                    }`}
                  />
                  {errors.department && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage(errors.department)}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="roleCategory">Role Category</Label>
                  <Input
                    id="roleCategory"
                    placeholder="e.g., Software Development"
                    {...register("roleCategory", {
                      required: "Role category is required",
                    })}
                    className={`rounded-xl bg-gray-100 border-none h-12 ${
                      errors.roleCategory ? "border-red-500" : ""
                    }`}
                  />
                  {errors.roleCategory && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage(errors.roleCategory)}
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
                  placeholder="e.g., Bachelor's Degree in Computer Science"
                  {...register("educationQualification", {
                    required: "Education qualification is required",
                  })}
                  className={`rounded-xl bg-gray-100 border-none h-12 ${
                    errors.educationQualification ? "border-red-500" : ""
                  }`}
                />
                {errors.educationQualification && (
                  <p className="text-sm text-red-500">
                    {getErrorMessage(errors.educationQualification)}
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
                      placeholder="e.g., React"
                      className={`rounded-xl bg-gray-100 border-none h-12 ${
                        errors.keySkills?.[index] ? "border-red-500" : ""
                      }`}
                      {...register(`keySkills.${index}`, {
                        required: "Key skill is required",
                        minLength: {
                          value: 2,
                          message: "Skill must be at least 2 characters"
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9\s\-\+\.\#\(\)]+$/,
                          message: "Please enter a valid skill name"
                        }
                      })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeKeySkill(index)}
                      disabled={keySkillsFields.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {keySkillsFields.map((item, index) => 
                  errors.keySkills?.[index] && (
                    <p key={`error-${index}`} className="text-sm text-red-500">
                      {getErrorMessage(errors.keySkills[index])}
                    </p>
                  )
                )}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-2 rounded-full"
                  onClick={() => appendKeySkill("")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Key Skill
                </Button>
                {errors.keySkills && typeof errors.keySkills === 'object' && !Array.isArray(errors.keySkills) && (
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
                      placeholder="e.g., Tailwind CSS"
                      className={`rounded-xl bg-gray-100 border-none h-12 ${
                        errors.skills?.[index] ? "border-red-500" : ""
                      }`}
                      {...register(`skills.${index}`, {
                        required: "Skill is required",
                        minLength: {
                          value: 2,
                          message: "Skill must be at least 2 characters"
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9\s\-\+\.\#\(\)]+$/,
                          message: "Please enter a valid skill name"
                        }
                      })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSkill(index)}
                      disabled={skillsFields.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {skillsFields.map((item, index) => 
                  errors.skills?.[index] && (
                    <p key={`error-${index}`} className="text-sm text-red-500">
                      {getErrorMessage(errors.skills[index])}
                    </p>
                  )
                )}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-2 rounded-full"
                  onClick={() => appendSkill("")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Skill
                </Button>
                {errors.skills && typeof errors.skills === 'object' && !Array.isArray(errors.skills) && (
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
                      className={`rounded-xl bg-gray-100 border-none h-12 ${
                        errors.location?.[index] ? "border-red-500" : ""
                      }`}
                      {...register(`location.${index}`, {
                        required: "Location is required",
                      })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLocation(index)}
                      disabled={locationFields.length <= 1}
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
                    <Plus className="h-4 w-4 mr-2" />
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
                <Label htmlFor="willingToRelocate">Willing to Relocate</Label>
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
                    placeholder="e.g., 5"
                    {...register("workExperience.min", {
                      required: "Min experience is required",
                      valueAsNumber: true,
                      min: {
                        value: 0,
                        message: "Experience cannot be negative"
                      }
                    })}
                    className={`rounded-xl bg-gray-100 border-none h-12 ${
                      errors.workExperience?.min ? "border-red-500" : ""
                    }`}
                  />
                  {errors.workExperience?.min && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage(errors.workExperience.min)}
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
                    placeholder="e.g., 8"
                    {...register("workExperience.max", {
                      required: "Max experience is required",
                      valueAsNumber: true,
                      min: {
                        value: 0,
                        message: "Experience cannot be negative"
                      },
                      validate: (value, formValues) => 
                        value >= formValues.workExperience.min || 
                        "Max experience must be greater than or equal to min experience"
                    })}
                    className={`rounded-xl bg-gray-100 border-none h-12 ${
                      errors.workExperience?.max ? "border-red-500" : ""
                    }`}
                  />
                  {errors.workExperience?.max && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage(errors.workExperience.max)}
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
                    placeholder="e.g., 1500000"
                    {...register("annualSalary.min", {
                      required: "Min salary is required",
                      valueAsNumber: true,
                      min: {
                        value: 1,
                        message: "Salary must be greater than 0"
                      }
                    })}
                    className={`rounded-xl bg-gray-100 border-none h-12 ${
                      errors.annualSalary?.min ? "border-red-500" : ""
                    }`}
                  />
                  {errors.annualSalary?.min && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage(errors.annualSalary.min)}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maxSalary">Max. Annual Salary</Label>
                  <Input
                    id="maxSalary"
                    type="number"
                    placeholder="e.g., 2500000"
                    {...register("annualSalary.max", {
                      required: "Max salary is required",
                      valueAsNumber: true,
                      min: {
                        value: 1,
                        message: "Salary must be greater than 0"
                      },
                      validate: (value, formValues) => 
                        value >= formValues.annualSalary.min || 
                        "Max salary must be greater than or equal to min salary"
                    })}
                    className={`rounded-xl bg-gray-100 border-none h-12 ${
                      errors.annualSalary?.max ? "border-red-500" : ""
                    }`}
                  />
                  {errors.annualSalary?.max && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage(errors.annualSalary.max)}
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
                    placeholder="e.g., Innovate Solutions Inc."
                    {...register("companyDetails.name", {
                      required: "Company name is required",
                    })}
                    className={`rounded-xl bg-gray-100 border-none h-12 ${
                      errors.companyDetails?.name ? "border-red-500" : ""
                    }`}
                  />
                  {errors.companyDetails?.name && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage(errors.companyDetails.name)}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="established">Established Year</Label>
                  <Input
                    id="established"
                    type="number"
                    placeholder="e.g., 2010"
                    {...register("companyDetails.established", {
                      required: "Established year is required",
                      valueAsNumber: true,
                      min: {
                        value: 1800,
                        message: "Year must be after 1800"
                      },
                      max: {
                        value: new Date().getFullYear(),
                        message: "Year cannot be in the future"
                      }
                    })}
                    className={`rounded-xl bg-gray-100 border-none h-12 ${
                      errors.companyDetails?.established ? "border-red-500" : ""
                    }`}
                  />
                  {errors.companyDetails?.established && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage(errors.companyDetails.established)}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="sector">Sector</Label>
                  <Input
                    id="sector"
                    placeholder="e.g., Software"
                    {...register("companyDetails.sector", {
                      required: "Sector is required",
                    })}
                    className={`rounded-xl bg-gray-100 border-none h-12 ${
                      errors.companyDetails?.sector ? "border-red-500" : ""
                    }`}
                  />
                  {errors.companyDetails?.sector && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage(errors.companyDetails.sector)}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="locatedAt">Located At</Label>
                  <Input
                    id="locatedAt"
                    placeholder="e.g., Bengaluru, India"
                    {...register("companyDetails.locatedAt", {
                      required: "Location is required",
                    })}
                    className={`rounded-xl bg-gray-100 border-none h-12 ${
                      errors.companyDetails?.locatedAt ? "border-red-500" : ""
                    }`}
                  />
                  {errors.companyDetails?.locatedAt && (
                    <p className="text-sm text-red-500">
                      {getErrorMessage(errors.companyDetails.locatedAt)}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="companyImage">Company Logo (optional)</Label>
                <Input
                  id="companyImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="rounded-xl bg-gray-100 border-none h-12"
                  disabled={imageUploading}
                />
                {imageUploading && <span>Uploading...</span>}
                {/* Preview uploaded logo */}
                {watchCompanyImage && (
                  <img
                    src={watchCompanyImage}
                    alt="Company Logo"
                    className="h-16 w-16 object-cover rounded-full border mt-2"
                  />
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="companyIndustry">Company Industry</Label>
                <Input
                  id="companyIndustry"
                  placeholder="e.g., Information Technology"
                  {...register("companyIndustry", {
                    required: "Company industry is required",
                  })}
                  className={`rounded-xl bg-gray-100 border-none h-12 ${
                    errors.companyIndustry ? "border-red-500" : ""
                  }`}
                />
                {errors.companyIndustry && (
                  <p className="text-sm text-red-500">
                    {getErrorMessage(errors.companyIndustry)}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="candidateIndustry">Candidate Industry</Label>
                <Input
                  id="candidateIndustry"
                  placeholder="e.g., IT-Software"
                  {...register("candidateIndustry", {
                    required: "Candidate industry is required",
                  })}
                  className={`rounded-xl bg-gray-100 border-none h-12 ${
                    errors.candidateIndustry ? "border-red-500" : ""
                  }`}
                />
                {errors.candidateIndustry && (
                  <p className="text-sm text-red-500">
                    {getErrorMessage(errors.candidateIndustry)}
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
                    onCheckedChange={(checked: boolean) =>
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
                    onCheckedChange={(checked: boolean) =>
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
                    onCheckedChange={(checked: boolean) =>
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
                    onCheckedChange={(checked: boolean) =>
                      setValue("diversityHiring.differentlyAbled", checked)
                    }
                  />
                  <Label htmlFor="differentlyAbled">Differently Abled</Label>
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="vacancy">Vacancy</Label>
              <Input
                id="vacancy"
                type="number"
                placeholder="e.g., 3"
                {...register("vacancy", {
                  required: "Vacancy is required",
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: "Vacancy must be at least 1"
                  }
                })}
                className={`rounded-xl bg-gray-100 border-none h-12 ${
                  errors.vacancy ? "border-red-500" : ""
                }`}
              />
              {errors.vacancy && (
                <p className="text-sm text-red-500">
                  {getErrorMessage(errors.vacancy)}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end p-6">
            <Button
              type="submit"
              className="rounded-full bg-primary hover:bg-primary-hover cursor-pointer capitalize text-card text-base"
              disabled={loading}
            >
              {loading ? (
                <>
                <BtnLoader /> {mode === "create" ? "Creating..." : "Updating..."}
                </>
              ) : (
                <>
                  {mode} Job Post
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}