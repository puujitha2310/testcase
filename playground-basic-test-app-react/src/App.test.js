import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('Test for Multiple sections of question rendered', () => {
  const { getByText } = render(<App />);
  const generalQuestionSection = getByText(/General questions/i);
  const intoxicateSection = getByText(/Intoxications/i);
  expect(generalQuestionSection).toBeInTheDocument();
  expect(intoxicateSection).toBeInTheDocument();
});

test('Check for Error when the user clicks submit without answering all questions', () => {
  const { getByText } = render(<App />);
  fireEvent.click(getByText(/Submit/i))
  const errorSection = getByText(/error/i);
  expect(errorSection).toBeInTheDocument();
});

test('Render all General section questions', () => {
  const { getByText } = render(<App />);
  const genderQues = getByText(/What is your gender/i);
  const dateofBirthQues = getByText(/What is your date of birth/i);
  const countryQues = getByText(/What is your country of birth/i)
  const maritalQues = getByText(/What is your marital status/i)
  expect(genderQues).toBeInTheDocument();
  expect(dateofBirthQues).toBeInTheDocument();
  expect(countryQues).toBeInTheDocument();
  expect(maritalQues).toBeInTheDocument();
});

test('Render all Intoxication questions', () => {
  const { getByText } = render(<App />);
  const smokeQues = getByText(/Do you smoke/i);
  const alcoholQues = getByText(/Do you drink alchohol/i);
  expect(smokeQues).toBeInTheDocument();
  expect(alcoholQues).toBeInTheDocument();
});
