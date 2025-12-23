# How to Monitor CI/CD Status

## 🔍 Check CI Status

### Method 1: GitHub Actions Page
1. Go to: **https://github.com/unnita1235/TenantVerse/actions**
2. You'll see all workflow runs
3. Green checkmark ✅ = Success
4. Red X ❌ = Failed
5. Yellow circle ⏳ = Running

### Method 2: README Badge
The README includes a CI badge that automatically shows:
- ✅ **Green**: All checks passing
- ❌ **Red**: Checks failing
- ⏳ **Yellow**: Checks running

### Method 3: Repository Homepage
On your GitHub repository page:
- Look for the "Actions" tab
- Recent workflow runs are shown
- Click to see detailed logs

## 📊 Understanding CI Results

### Successful Run
When CI passes, you'll see:
```
✅ lint-and-build (frontend) - Success
✅ lint-and-build (backend) - Success
```

### Failed Run
If CI fails, check:
1. **Which job failed** (frontend or backend)
2. **Error message** in the logs
3. **Common issues**:
   - TypeScript errors
   - Build failures
   - Missing dependencies

## 🔔 Get Notifications

### Email Notifications
GitHub will email you when:
- CI fails
- CI passes after a failure

### GitHub Notifications
Enable in Settings → Notifications:
- Watch repository
- Get notifications for workflow runs

## 📈 CI Statistics

View detailed stats:
1. Go to Actions tab
2. Click on a workflow run
3. See:
   - Build time
   - Which steps took longest
   - Success rate

## 🚨 Troubleshooting Failed CI

### If Frontend Build Fails
1. Check TypeScript errors locally: `npm run typecheck`
2. Fix any type errors
3. Commit and push

### If Backend Build Fails
1. Check TypeScript errors: `cd backend && npx tsc --noEmit`
2. Verify all dependencies in `package.json`
3. Fix errors and push

### Re-run Failed Workflow
1. Go to Actions tab
2. Click on failed workflow
3. Click "Re-run all jobs"

## ✅ Current CI Status

Check now: **https://github.com/unnita1235/TenantVerse/actions**

The latest push should have triggered a workflow run. Check if it's:
- ✅ Passing (green)
- ❌ Failing (red - check logs)
- ⏳ Running (yellow - wait for completion)

---

**Pro Tip**: Bookmark the Actions page for quick status checks!

