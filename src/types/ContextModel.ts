import { AnswerController } from '../controllers/AnswerController';
import { BidController } from '../controllers/BidController';
import { CarController } from '../controllers/CarController';
import { CommentController } from '../controllers/CommentController';
import ImageController from '../controllers/ImageController';
import { UserController } from '../controllers/UserController';

type Context = {
	userId: number | null;
	controllers: ContextControllers;
};

export type ContextControllers = {
	answerController: AnswerController;
	bidController: BidController;
	carController: CarController;
	commentController: CommentController;
	imageController: ImageController;
	userController: UserController;
};

export default Context;
