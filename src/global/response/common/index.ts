export const createServerExceptionResponse = () => {
  return {
    status: 500,
    description: '서버에서 오류가 발생했습니다.',
    schema: {
      properties: {
        statusCode: {
          type: 'number',
          example: 500,
        },
        message: {
          type: 'string',
          example: 'Internal server error',
        },
      },
    },
  };
};

export const createUnauthorizedResponse = () => {
  return {
    status: 401,
    description: 'Token이 유효하지 않습니다.',
    schema: {
      properties: {
        statusCode: {
          type: 'number',
          example: 401,
        },
        message: {
          type: 'string',
          example: 'Unauthorized',
        },
      },
    },
  };
};

export const createResponseMessage = () => {
  return {
    status: 200,
    message: {
      type: 'string',
      example: 'Login Success',
    },
  };
};
