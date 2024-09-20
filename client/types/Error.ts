interface CustomError extends Error {
  code?: number;
  message: string;
  // Другие свойства, специфичные для вашего типа ошибок
}