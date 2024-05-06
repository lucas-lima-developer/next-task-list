import mongoose from "mongoose";
import DatabaseService from "@/lib/services/DatabaseService";
import Task from "@/lib/models/Task";
import TaskInterface from "@/lib/interfaces/Task";

/**
 * Classe que realiza serviços relacionados a tarefas.
 *
 * @export
 * @class TaskService
 */
export default class TaskService {
  /**
   * Cria uma nova tarefa.
   *
   * @static
   * @param {Object} task - tarefa a ser adicionada.
   * @param {string} task.title - título da tarefa.
   * @param {mongoose.Types.ObjectId} task.userId - id do usuário da tarefa.
   * @return {Promise<TaskInterface>} - Promessa que resolve tarefa criada.
   * @memberof TaskService
   */
  static async create(task: { title: string, userId: mongoose.Types.ObjectId }): Promise<TaskInterface> {
    await DatabaseService.connect();

    const taskCreated = await Task.create(task);

    if (!taskCreated) throw new Error("Não foi possível criar a tarefa.")

    return taskCreated;
  }

  /**
   * Procura a tarefa pelo id.
   *
   * @static
   * @param {string} id - id da tarefa.
   * @return {Promise<TaskInterface>} - Promessa que retorna a tarefa.
   * @memberof TaskService
   */
  static async get(id: string): Promise<TaskInterface> {
    await DatabaseService.connect();

    const task = await Task.findById(id);

    if (!task) throw new Error(`Não foi encontrado tarefa com id = ${id}.`);

    return task;
  }

  /**
   * Deleta a tarefa pelo id.
   *
   * @static
   * @param {string} id - id da tarefa.
   * @memberof TaskService
   */
  static async delete(id: string) {
    await DatabaseService.connect();

    try {
      const task = await TaskService.get(id);
      await task.deleteOne();
    } catch (error) {
      throw new Error(`Não foi possível deletar tarefa ${id}`);
    }
  }

  /**
   * Retorna todas as tarefas de determinado usuário.
   * 
   * @param userId - id do usuário
   * @returns {Promise<TaskInterface[]>}
   */
  static async getAll(userId: string): Promise<TaskInterface[]> {
    const tasks = await Task.find({ userId });

    return tasks;
  }

  /**
   * Atualiza o título da tarefa.
   *
   * @static
   * @param {string} id - id da tarefa.
   * @param {string} title - novo título da tarefa.
   * @return {Promise<void>}
   * @memberof TaskService
   */
  static async updateTitle(id: string, title: string) : Promise<void> {
    const task = await Task.findById(id);

    task.title = title;
    await task.save();
  }

  /**
   * Atualiza status isComplete de tarefa.
   *
   * @static
   * @param {string} id - id da tarefa.
   * @param {boolean} isComplete - novo status isComplete.
   * @return {Promise<void>}
   * @memberof TaskService
   */
  static async updateIsCompleted(id: string, isComplete: boolean) : Promise<void> {
    const task = await Task.findById(id);

    task.isComplete = isComplete;
    await task.save();
  }
}