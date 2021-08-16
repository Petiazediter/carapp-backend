import { AnswerController } from '../controllers/AnswerController';
import { UserController } from '../controllers/UserController';

type Context = {
	userId: number | null;
	controllers: ContextControllers;
};

export type ContextControllers = {
	userController: UserController;
	answerController: AnswerController;
};

export default Context;
