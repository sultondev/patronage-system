import {
  Button,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { FC, memo, useCallback, useEffect, useRef } from "react";
import { useApi } from "../../hooks/useApi.hook";
import { Category } from "../../typing/types/Category.type";

interface Props {
  onCreate: (values: any) => void;
  categoryId: number;
}

const AnswerQuestions: FC<Props> = ({ categoryId, onCreate }) => {
  const {
    data: category,
    loading,
    error,
  } = useApi<Category>("/categories/" + categoryId, {
    params: {
      include: "all",
    },
  });

  const answers = useRef<{ value: boolean; questionId: number }[]>([]);
  const questionsAmount = 0;
  const answeredQuestions = 0;
  const onSubmit = useCallback(() => {
    onCreate({ answers: answers.current });
  }, [answers.current]);

  useEffect(() => {
    if (category) {
      answers.current = category.schedules
        .flatMap((schedule) => [...schedule.questions])
        .flatMap((question) => [{ value: false, questionId: question.id }]);
      console.log(answers.current);
    }
  }, [category]);

  if ((loading && !category) || error) {
    return (
      <div>{loading && !category ? "Yuklanmoqda..." : "Hatolik yuz berdi"}</div>
    );
  }

  const handleToggle = (value: boolean, qID: number) => {
    const index = answers.current.findIndex(
      (answer) => answer.questionId === qID
    );
    answers.current[index] = { ...answers.current[index], value };
  };
  console.log(questionsAmount);
  return (
    <section className="my-8">
      {category && (
        <>
          <h3 className="text-xl text-center font-bold">
            "{category.name}" bo'limidagi savollarga javob bering
          </h3>
          <div>
            {category.schedules.map((schedule) => {
              return (
                <div key={"schedule" + schedule.id} className="mt-8">
                  <h3 className="text-lg">{schedule.name}</h3>
                  <List
                    sx={{
                      width: "100%",
                      bgcolor: "background.paper",
                    }}
                  >
                    <Divider component="li" />

                    {schedule.questions.map((question, index) => {
                      return (
                        <>
                          <ListItem key={question.id}>
                            <ListItemText
                              disableTypography
                              primary={
                                <Typography className="ex-sm:w-1/2 md:w-[70%]">
                                  {question.title}
                                </Typography>
                              }
                            />
                            <ListItemSecondaryAction>
                              <RadioGroup
                                onChange={(e) =>
                                  handleToggle(
                                    Boolean(e.target.value),
                                    question.id
                                  )
                                }
                                row
                                // defaultValue={false}
                              >
                                <FormControlLabel
                                  value={true}
                                  control={<Radio />}
                                  label="Ha"
                                />
                                <FormControlLabel
                                  value={false}
                                  control={<Radio />}
                                  label="Yo'q"
                                />
                              </RadioGroup>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <Divider component="li" />
                        </>
                      );
                    })}
                  </List>
                </div>
              );
            })}
          </div>
        </>
      )}
      <Button
        variant="contained"
        onClick={onSubmit}
        // disabled={questionsAmount === answeredQuestions ? false : true}
      >
        Arizani yuborish
      </Button>
    </section>
  );
};

export default memo(AnswerQuestions);
