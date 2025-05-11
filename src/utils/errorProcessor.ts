const errorProcessor = (error: Record<string, any>) => {
  const messages: Record<string, string[]> = {};

  Object.entries(error).forEach(([key, value]) => {
    if (Array.isArray(value._errors) && value._errors.length > 0) {
      messages[key] = value._errors[0];
    }
  });
  return messages;
};

export default errorProcessor;
