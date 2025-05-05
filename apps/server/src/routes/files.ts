import fs from 'node:fs/promises';
import path from 'node:path';
import { Router, Request, Response } from 'express';

interface FileTree {
    [key: string]: FileTree | null;
}

const router = Router();

async function generateFileTree(directory: string): Promise<FileTree> {
    const tree: FileTree = {};

    async function buildTree(currentDir: string, currentTree: FileTree): Promise<void> {
        const files: string[] = await fs.readdir(currentDir);

        for (const file of files) {
            const filePath: string = path.join(currentDir, file);
            const stat = await fs.stat(filePath);

            if (stat.isDirectory()) {
                currentTree[file] = {};
                await buildTree(filePath, currentTree[file] as FileTree);
            } else {
                currentTree[file] = null;
            }
        }
    }

    await buildTree(directory, tree);
    return tree;
}

router.get('/', async (req: Request, res: Response) => {
    try {
        const fileTree = await generateFileTree('../user-storage');
        res.json({ tree: fileTree });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate file tree', details: (error as Error).message });
    }
});

router.get('/content', async (req: Request, res: Response) => {
    try {
        const filePath = req.query.path;
        const content = await fs.readFile(`../user-storage${filePath}`, 'utf-8');
        res.json({ content });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to get file content',
            details: (error as Error).message
        });
    }
});

export default router;