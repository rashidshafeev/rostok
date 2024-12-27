module.exports = {
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Enforce file path as first line comment',
        category: 'Best Practices',
        recommended: true,
      },
      fixable: 'code',
      schema: [],
    },
    create(context) {
      const sourceCode = context.getSourceCode();
      const filename = context.getFilename();
  
      return {
        Program(node) {
          const comments = sourceCode.getAllComments();
          const firstComment = comments[0];
          
          // Get relative path from src
          const relativePath = filename.split('src')[1];
          const expectedComment = `// src${relativePath}`;
  
          if (!firstComment || !firstComment.value.includes(relativePath)) {
            context.report({
              node,
              message: 'File should start with path comment',
              fix(fixer) {
                // If no comments exist, add to start of file
                if (!firstComment) {
                  return fixer.insertTextBefore(node, `${expectedComment}\n\n`);
                }
                // Replace incorrect first comment
                return fixer.replaceText(firstComment, expectedComment);
              }
            });
          }
        }
      };
    },
  };