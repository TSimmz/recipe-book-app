import { trpc } from '@/utils/trpc';
import {
  Group,
  Image,
  Card,
  useMantineTheme,
  Divider,
  ScrollArea,
  Stack,
  Text,
  Modal,
  TextInput,
  Textarea,
  NumberInput,
  createStyles,
} from '@mantine/core';
import { CustomButton, IconButton } from '@/components';
import { useAppDispatch } from '@/features/store';
import { clearActiveRecipe } from '@/features/dashboard/dashboardSlice';
import { useForm, zodResolver } from '@mantine/form';
import { IconTrash, IconCirclePlus } from '@tabler/icons';
import { randomId } from '@mantine/hooks';
import { z } from 'zod';
import { useEffect, useRef, useState } from 'react';

const useStyles = createStyles((theme) => ({
  cardContainer: {
    borderRadius: theme.spacing.lg,
    margin: 0,
    marginLeft: '1rem',
    backgroundColor: theme.colors.dark[6],
  },
  cardGrid: {
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.lg,
    paddingLeft: theme.spacing.sm,
    paddingRight: theme.spacing.md,
    margin: 0,
  },
  form: {
    '& .mantine-TextInput-label, .mantine-Textarea-label, .mantine-NumberInput-label':
      {
        marginBottom: theme.spacing.xs,
      },

    '& .mantine-TextInput-required, .mantine-Textarea-required, .mantine-NumberInput-required':
      {
        color: theme.colors.orange[3],
      },
  },

  stack: {
    paddingRight: theme.spacing.md,
  },

  ingredientField: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
}));

const editRecipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  prepTime: z.object({
    hours: z.number().nonnegative().int(),
    minutes: z.number().nonnegative().int().max(59),
  }),
  cookTime: z.object({
    hours: z.number().nonnegative().int(),
    minutes: z.number().nonnegative().int().max(59),
  }),
  numberOfServings: z.number().int().positive().min(1),
  ingredients: z
    .object({
      key: z.string(),
      value: z.number(),
      unit: z.string(),
      name: z.string(),
    })
    .array(),
  steps: z
    .object({
      key: z.string(),
      stepNumber: z.number().positive().int(),
      description: z.string(),
      note: z.string().optional(),
    })
    .array(),
});

type EditRecipeProps = {
  recipeId: string;
  recipeData: any;
  editRecipeActive: boolean;
  setEditRecipeActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditRecipe: React.FC<EditRecipeProps> = ({
  recipeId,
  recipeData,
  editRecipeActive,
  setEditRecipeActive,
}: EditRecipeProps) => {
  const dispatch = useAppDispatch();

  const { classes } = useStyles();
  const theme = useMantineTheme();

  const [isCancelModalOpened, setIsCancelModalOpened] = useState(false);

  const editRecipeMutation = trpc.useMutation(['recipe.updateRecipe'], {
    onSuccess: () => {},
  });

  const editForm = useForm({
    validate: zodResolver(editRecipeSchema),
    initialValues: {
      title: '',
      description: '',
      prepTime: {
        hours: 0,
        minutes: 0,
      },
      cookTime: {
        hours: 0,
        minutes: 0,
      },
      numberOfServings: 1,
      ingredients: [{ key: randomId(), value: 0, unit: '', name: '' }],
      steps: [{ key: randomId(), stepNumber: 1, description: '', note: '' }],
    },
  });

  //== Feels a little janky =====
  let initialDataSet = useRef(false);
  useEffect(() => {
    editForm.setValues(recipeData);
    initialDataSet.current = true;
  }, []);

  useEffect(() => {
    editForm.resetDirty();
  }, [initialDataSet.current]);
  //=============================

  const handleAddIngredient = () => {
    editForm.insertListItem('ingredients', {
      key: randomId(),
      value: 0,
      unit: '',
      name: '',
    });
  };

  const ingredients = editForm.values.ingredients.map(
    (ingredient: any, index: number) => (
      <Group
        key={ingredient.key}
        mb={theme.spacing.xs}
        style={{ alignItems: 'flex-end' }}
      >
        <NumberInput
          label="Value"
          stepHoldDelay={500}
          stepHoldInterval={100}
          min={0}
          w={100}
          required
          {...editForm.getInputProps(`ingredients.${index}.value`)}
        />
        <TextInput
          placeholder="Unit"
          label="Unit"
          required
          w={100}
          {...editForm.getInputProps(`ingredients.${index}.unit`)}
        />
        <TextInput
          placeholder="Name"
          label="Name"
          required
          {...editForm.getInputProps(`ingredients.${index}.name`)}
        />
        <IconButton
          label="Delete"
          tooltipPosition={'top'}
          icon={<IconTrash color={theme.colors.red[5]} size={20} />}
          handleClick={() => editForm.removeListItem('ingredients', index)}
        />
      </Group>
    ),
  );

  const handleAddStep = () => {
    editForm.insertListItem('steps', {
      key: randomId(),
      stepNumber: 1,
      description: '',
      note: '',
    });
  };

  const steps = editForm.values.steps.map((step: any, index: number) => (
    <div
      key={step.key}
      style={{
        marginBottom: theme.spacing.md,
        display: 'flex',
        alignItems: 'flex-start',
      }}
    >
      <Textarea
        style={{ flexGrow: 1 }}
        placeholder="Description"
        label="Description"
        required
        {...editForm.getInputProps(`steps.${index}.description`)}
      />
      <Textarea
        placeholder="Note"
        label="Note"
        {...editForm.getInputProps(`steps.${index}.note`)}
      />
      <IconButton
        label="Delete"
        tooltipPosition={'top'}
        icon={<IconTrash color={theme.colors.red[5]} size={20} />}
        handleClick={() => editForm.removeListItem('steps', index)}
      />
    </div>
  ));

  const handleSaveClick = (values: typeof editForm.values) => {
    if (editForm.isDirty()) {
      editRecipeMutation.mutate({
        id: recipeId,
        title: values.title,
        description: values.description,
        prepTime: values.prepTime,
        cookTime: values.cookTime,
        numberOfServings: values.numberOfServings,
        ingredients: values.ingredients,
        steps: values.steps,
      });

      setEditRecipeActive(false);
    }
  };

  const handleCancelClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    if (!editForm.isDirty()) setEditRecipeActive(false);
    else setIsCancelModalOpened(true);
  };

  return (
    <Card p={theme.spacing.xl} className={classes.cardContainer}>
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1453&q=80"
          height={150}
          alt="Recipe"
        />
      </Card.Section>
      <form
        className={classes.form}
        onSubmit={editForm.onSubmit(handleSaveClick)}
      >
        <Group
          grow
          position="apart"
          mt={theme.spacing.md}
          mb={theme.spacing.sm}
        >
          <TextInput
            fw={'normal'}
            size={'lg'}
            c={theme.white}
            ff={theme.fontFamily}
            placeholder="Recipe Title"
            aria-label="Recipe Title"
            required
            {...editForm.getInputProps('title')}
          />
          <Group position="right">
            <CustomButton
              label="Save"
              active
              disabled={!editForm.isDirty()}
              type="submit"
            />
            <CustomButton label="Cancel" onClickHandler={handleCancelClick} />
          </Group>
        </Group>

        <Divider color={theme.white} size={2} />

        <ScrollArea.Autosize
          offsetScrollbars
          scrollHideDelay={150}
          mt={theme.spacing.xs}
          maxHeight={'82vh'}
          style={{ width: '100%' }}
        >
          <div className={classes.cardGrid}>
            <Group w="100%" mb={theme.spacing.xl}>
              <Text size={14} fs="italic">
                {'Prep Time: '}
              </Text>
              <NumberInput
                aria-label="Hours"
                stepHoldDelay={500}
                stepHoldInterval={100}
                min={0}
                w={100}
                required
                {...editForm.getInputProps('prepTime.hours')}
              />
              <Text size={14} fs="italic" ml={-theme.spacing.sm}>
                {'h'}
              </Text>
              <NumberInput
                aria-label="Minutes"
                stepHoldDelay={500}
                stepHoldInterval={100}
                required
                min={0}
                max={59}
                w={100}
                {...editForm.getInputProps('prepTime.minutes')}
              />
              <Text size={14} fs="italic" ml={-theme.spacing.sm}>
                {'m'}
              </Text>
              <Text size={14} fs="italic" ml={theme.spacing.md}>
                {'Cook Time: '}
              </Text>
              <NumberInput
                aria-label="Hours"
                stepHoldDelay={500}
                stepHoldInterval={100}
                min={0}
                w={100}
                required
                {...editForm.getInputProps('cookTime.hours')}
              />
              <Text size={14} fs="italic" ml={-theme.spacing.sm}>
                {'h'}
              </Text>
              <NumberInput
                aria-label="Minutes"
                stepHoldDelay={500}
                stepHoldInterval={100}
                required
                min={0}
                max={59}
                w={100}
                {...editForm.getInputProps('cookTime.minutes')}
              />{' '}
              <Text size={14} fs="italic" ml={-theme.spacing.sm}>
                {'m'}
              </Text>
              <Text size={14} ml={theme.spacing.md} fs="italic">
                Servings:
              </Text>
              <NumberInput
                aria-label="Number of Servings"
                stepHoldDelay={500}
                stepHoldInterval={100}
                required
                min={0}
                max={100}
                w={100}
                {...editForm.getInputProps('numberOfServings')}
              />
            </Group>

            <Stack mb={theme.spacing.xl} style={{ gap: theme.spacing.xs }}>
              <Text size={24} mb={theme.spacing.xs} td="underline">
                Description
              </Text>
              <Textarea
                placeholder="Description"
                aria-label="Description"
                required
                {...editForm.getInputProps('description')}
              />
            </Stack>

            <Stack mb={theme.spacing.xl} style={{ gap: theme.spacing.xs }}>
              <Text size={24} mb={theme.spacing.xs} td="underline">
                Ingredients
              </Text>
              {ingredients}
              <CustomButton
                active
                label={'Add Ingredient'}
                rightIcon={<IconCirclePlus size={16} />}
                onClickHandler={handleAddIngredient}
              />
            </Stack>
            <Stack style={{ gap: theme.spacing.xs }}>
              <Text size={24} my={theme.spacing.md} td="underline">
                Directions
              </Text>
              {steps}
              <CustomButton
                active
                label={'Add Step'}
                rightIcon={<IconCirclePlus size={16} />}
                onClickHandler={handleAddStep}
              />
            </Stack>
          </div>
        </ScrollArea.Autosize>
      </form>
      <Modal
        centered
        size="sm"
        radius={'lg'}
        title={`Cancel Recipe Edit`}
        opened={isCancelModalOpened}
        onClose={() => setIsCancelModalOpened(false)}
      >
        <Stack align={'center'}>
          <Text size={16} mb="lg" ta={'center'}>
            {`All changes will be lost. Are you sure?`}
          </Text>
          <Group position="apart" style={{ gap: theme.spacing.xl }}>
            <CustomButton
              label="Yes"
              active
              onClickHandler={() => setEditRecipeActive(false)}
            />
            <CustomButton
              label="No"
              active
              onClickHandler={() => setIsCancelModalOpened(false)}
            />
          </Group>
        </Stack>
      </Modal>
    </Card>
  );
};

export default EditRecipe;
