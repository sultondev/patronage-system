import { Box, Step, StepLabel, Stepper } from "@mui/material";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { authProtectedApi } from "../../config/axios.config";
import { useUser } from "../../hooks/useUser.hook";
import AnswerQuestions from "./AnswerQuestions";
import CreateApplicationForm from "./CreateApplicationForm";
import CreateClientForm from "./CreateClientForm";
import { useNavigate } from "react-router-dom";

type Answer = {
  value: boolean;
  questionId: number;
};

type Location = {
  latitude: string;
  longitude: string;
};

type Application = {
  location: Location;
  comment: string;
  createdBy: number;
  categoryId: number;
  clientId: number;
  answers: Answer[];
};

const CreateApplication = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { user } = useUser();
  const navigate = useNavigate();

  const [application, setApplication] = useState<Application>({
    location: {
      latitude: "",
      longitude: "",
    },
    comment: "",
    createdBy: user.id || 0,
    categoryId: 0,
    clientId: 0,
    answers: [],
  });

  const onClientCreate = useCallback(
    (data: Pick<Application, "clientId">) => {
      setApplication((application) => ({
        ...application,
        clientId: data.clientId,
      }));

      handleNext();
    },
    [application]
  );

  const onApplicationCreate = useCallback(
    ({ categoryId, comment }: Pick<Application, "categoryId" | "comment">) => {
      console.log(categoryId, comment);
      setApplication((application) => ({
        ...application,
        categoryId,
        comment,
      }));
      handleNext();
    },
    [application]
  );
  const onAnswersCreate = useCallback(
    async ({ answers }: Pick<Application, "answers">) => {
      // setApplication((application) => ());
      try {
        const { data } = await authProtectedApi().post("/applications", {
          ...application,
          answers,
        });

        console.log(data);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    },
    [application]
  );

  const steps = useMemo<
    {
      label: string;
      component: ReactNode;
    }[]
  >(
    () => [
      {
        label: "Mijoz ma'lumotlarini kiritish",
        component: (
          <CreateClientForm
            onCreate={onClientCreate}
            key={"create-client-form"}
          />
        ),
      },
      {
        label: "Ariza ma'lumotlarini kiritish",
        component: (
          <CreateApplicationForm
            key={"create-application-form"}
            onCreate={onApplicationCreate}
          />
        ),
      },
      {
        label: "Savollarga javob berish",
        component: (
          <AnswerQuestions
            onCreate={onAnswersCreate}
            key={"create-answers"}
            categoryId={application.categoryId}
          />
        ),
      },
    ],
    [application]
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setApplication((application) => ({
        ...application,
        location: {
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        },
      }));
    });
  }, []);

  return (
    <div className="w-full flex justify-center mt-10">
      <Box sx={{ width: "60%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map(({ label }, index) => {
            return (
              <Step key={index + "stepper-label"}>
                <StepLabel>
                  <span className="sm:block ex-sm:hidden">{label}</span>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div className="mt-16">{steps[activeStep].component}</div>
      </Box>
    </div>
  );
};

export default CreateApplication;
