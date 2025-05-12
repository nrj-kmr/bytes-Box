import fs from 'node:fs/promises';
import path from 'node:path';
import { Router, Request, Response } from 'express';

interface FileTree {
    [key: string]: FileTree | null;
}

const router = Router();

const baseDir = path.resolve(process.cwd(), 'user-storage');

async function generateFileTree(directory: string): Promise<FileTree> {
    const tree: FileTree = {};

    async function buildTree(currentDir: string, currentTree: FileTree): Promise<void> {
        const files: string[] = await fs.readdir(currentDir);

        for (const file of files) {
            const filePath: string = path.join(currentDir, file);
            const stat = await fs.stat(filePath);

            if (stat.isDirectory()) {
                currentTree[file] = { children: {} };
                await buildTree(filePath, currentTree[file].children as FileTree);
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
        const filePath = req.query.path as string;
        const cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
        const content = await fs.readFile(path.join(baseDir, cleanPath), 'utf-8');
        res.json({ content });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to get file content',
            details: (error as Error).message
        });
    }
});

router.post('/create', async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, type, parentPath } = req.body;

        if (!name || !type) {
            res.status(400).json({ error: 'Name and type of the item are required!' });
            return;
        }

        const cleanParent = parentPath ? (parentPath.startsWith('/') ? parentPath.slice(1) : parentPath) : '';
        const targetPath = path.join(baseDir, cleanParent, name);

        if (type === 'folder') {
            await fs.mkdir(targetPath, { recursive: true });
        } else if (type === 'file') {
            await fs.mkdir(path.dirname(targetPath), { recursive: true });
            await fs.writeFile(targetPath, '');
        } else {
            res.status(400).json({ error: 'Invalid Type. Must be "file" or "folder".' });
            return;
        }

        res.status(201).json({ message: `${type} created successfully`, path: targetPath });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to create item',
            details: (error as Error).message,
        });
    }
})

export default router;