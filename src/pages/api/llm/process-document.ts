// Next.js API route for document processing
import { NextApiRequest, NextApiResponse } from 'next';
import { llmProcessor } from '@/lib/llm';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { documentText } = req.body;

    if (!documentText) {
      return res.status(400).json({ error: 'Document text is required' });
    }

    const result = await llmProcessor.processDocument(documentText);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error processing document:', error);
    return res.status(500).json({ error: 'Failed to process document' });
  }
}
