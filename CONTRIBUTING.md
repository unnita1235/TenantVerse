# Contributing to TenantVerse

First off, thank you for considering contributing to TenantVerse! It's people like you that make TenantVerse such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- - **Describe the exact steps which reproduce the problem**
  - - **Provide specific examples to demonstrate the steps**
    - - **Describe the behavior you observed after following the steps**
      - - **Explain which behavior you expected to see instead and why**
        - - **Include screenshots and animated GIFs if possible**
          - - **Include your environment details** (OS, Node version, browser, etc.)
           
            - ### Suggesting Enhancements
           
            - Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:
           
            - - **Use a clear and descriptive title**
              - - **Provide a step-by-step description of the suggested enhancement**
                - - **Provide specific examples to demonstrate the steps**
                  - - **Describe the current behavior and expected behavior**
                    - - **Explain why this enhancement would be useful**
                     
                      - ### Pull Requests
                     
                      - - Fill in the required template
                        - - Follow the TypeScript styleguides
                          - - End all files with a newline
                            - - Avoid platform-dependent code
                              - - Document new code based on the Documentation Styleguide
                               
                                - ## Development Setup
                               
                                - ### Prerequisites
                               
                                - - Node.js 18+
                                  - - npm or yarn
                                    - - Git
                                      - - MongoDB Atlas account (or local MongoDB)
                                       
                                        - ### Local Development
                                       
                                        - 1. **Fork the repository**
                                         
                                          2. git clone https://github.com/your-username/TenantVerse.git
                                          3. cd TenantVerse
                                         
                                          4. 2. **Install dependencies**
                                            
                                             3. npm install
                                             4. cd backend && npm install && cd ..
                                            
                                             5. 3. **Set up environment variables**
                                               
                                                4. Frontend (.env.local)
                                                5. NEXT_PUBLIC_API_URL=http://localhost:3001/api
                                               
                                                6. Backend (.env)
                                                7. NODE_ENV=development
                                                8. PORT=3001
                                                9. MONGODB_URI=mongodb://localhost:27017/tenantverse
                                                10. JWT_SECRET=dev-secret-key-change-in-production
                                                11. STRIPE_SECRET_KEY=sk_test_...
                                                12. CORS_ORIGIN=http://localhost:3000
                                               
                                                13. 4. **Start development servers**
                                                   
                                                    5. Terminal 1: Frontend
                                                    6. npm run dev
                                                   
                                                    7. Terminal 2: Backend
                                                    8. cd backend && npm run dev
                                                   
                                                    9. 5. **Verify setup**
                                                      
                                                       6. - Frontend: http://localhost:3000
                                                          - - Backend: http://localhost:3001/api/health
                                                           
                                                            - ## Git Workflow
                                                           
                                                            - 1. **Create a feature branch**
                                                             
                                                              2. git checkout -b feature/your-feature-name
                                                             
                                                              3. 2. **Make your changes**
                                                                
                                                                 3. npm run lint
                                                                 4. npm run format
                                                                
                                                                 5. 3. **Commit your changes**
                                                                   
                                                                    4. git add .
                                                                    5. git commit -m "feat: your feature description"
                                                                   
                                                                    6. Commit message format:
                                                                    - `feat:` - A new feature
                                                                    - - `fix:` - A bug fix
                                                                      - - `docs:` - Documentation only changes
                                                                        - - `style:` - Changes that don't affect code meaning
                                                                          - - `refactor:` - Code change that neither fixes a bug nor adds a feature
                                                                            - - `test:` - Adding missing tests
                                                                              - - `chore:` - Changes to build process, dependencies, etc
                                                                               
                                                                                - 4. **Push to your fork**
                                                                                 
                                                                                  5. git push origin feature/your-feature-name
                                                                                  6. 
                                                                                  5. **Create a Pull Request**
                                                                                 
                                                                                  6. - Use a clear and descriptive title
                                                                                     - - Reference any related issues using #issue-number
                                                                                       - - Describe your changes in detail
                                                                                         - - Include screenshots for UI changes
                                                                                           - - Ensure all tests pass
                                                                                            
                                                                                             - ## Testing
                                                                                            
                                                                                             - ### Frontend Tests
                                                                                            
                                                                                             - npm run test
                                                                                             - npm run test -- --coverage
                                                                                            
                                                                                             - ### Backend Tests
                                                                                            
                                                                                             - cd backend
                                                                                             - npm run test
                                                                                             - npm run test -- --coverage
                                                                                            
                                                                                             - ### Manual Testing
                                                                                            
                                                                                             - - Test all major user flows
                                                                                               - - Test on different browsers
                                                                                                 - - Test on mobile devices
                                                                                                   - - Test error scenarios
                                                                                                    
                                                                                                     - ## Code Style
                                                                                                    
                                                                                                     - ### TypeScript
                                                                                                    
                                                                                                     - - Use strict type checking
                                                                                                       - - Avoid `any` type when possible
                                                                                                         - - Use meaningful variable names
                                                                                                           - - Add JSDoc comments for complex functions
                                                                                                            
                                                                                                             - ### Frontend (React/Next.js)
                                                                                                            
                                                                                                             - - Use functional components with hooks
                                                                                                               - - Extract reusable components
                                                                                                                 - - Use props for component communication
                                                                                                                   - - Keep components focused and small
                                                                                                                     - - Use context API for global state
                                                                                                                      
                                                                                                                       - ### Backend (Express)
                                                                                                                      
                                                                                                                       - - Use async/await, not callbacks
                                                                                                                         - - Implement error handling middleware
                                                                                                                           - - Use validation middleware for all inputs
                                                                                                                             - - Keep routes clean and organized
                                                                                                                               - - Use dependency injection for services
                                                                                                                                
                                                                                                                                 - ### CSS/Tailwind
                                                                                                                                
                                                                                                                                 - - Use Tailwind utility classes
                                                                                                                                   - - Create reusable component variants
                                                                                                                                     - - Follow mobile-first approach
                                                                                                                                       - - Use dark mode utilities where appropriate
                                                                                                                                        
                                                                                                                                         - ## Documentation
                                                                                                                                        
                                                                                                                                         - - Update README.md if you change functionality
                                                                                                                                           - - Add comments for complex logic
                                                                                                                                             - - Update API documentation if adding endpoints
                                                                                                                                               - - Include JSDoc comments for functions
                                                                                                                                                
                                                                                                                                                 - ## Performance Considerations
                                                                                                                                                
                                                                                                                                                 - - Use React.memo for expensive components
                                                                                                                                                   - - Optimize database queries with proper indexing
                                                                                                                                                     - - Implement pagination for large datasets
                                                                                                                                                       - - Lazy load components and routes
                                                                                                                                                         - - Compress images and assets
                                                                                                                                                          
                                                                                                                                                           - ## Security Best Practices
                                                                                                                                                          
                                                                                                                                                           - - Never commit secrets or API keys
                                                                                                                                                             - - Use environment variables for configuration
                                                                                                                                                               - - Validate and sanitize user input
                                                                                                                                                                 - - Use parameterized queries to prevent SQL injection
                                                                                                                                                                   - - Implement rate limiting for API endpoints
                                                                                                                                                                     - - Keep dependencies updated
                                                                                                                                                                      
                                                                                                                                                                       - ## Need Help?
                                                                                                                                                                      
                                                                                                                                                                       - - Ask questions in GitHub Discussions
                                                                                                                                                                         - - Email: unnita1235@gmail.com
                                                                                                                                                                           - - Check existing documentation
                                                                                                                                                                            
                                                                                                                                                                             - ## Recognition
                                                                                                                                                                            
                                                                                                                                                                             - Contributors will be recognized in:
                                                                                                                                                                             - - CONTRIBUTORS.md file
                                                                                                                                                                               - - GitHub contributors page
                                                                                                                                                                                 - - Release notes
                                                                                                                                                                                  
                                                                                                                                                                                   - ## License
                                                                                                                                                                                  
                                                                                                                                                                                   - By contributing to TenantVerse, you agree that your contributions will be licensed under its MIT License.
                                                                                                                                                                                  
                                                                                                                                                                                   - ---
                                                                                                                                                                                   
                                                                                                                                                                                   Thank you for contributing to TenantVerse! 🎉
