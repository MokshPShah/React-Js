import UploadFile from './components/UploadFile';
import FileList from './components/FileList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">DocuVault</h1>
          <p className="mt-2 text-gray-500">Secure Digital Document Manager</p>
        </header>

        <section>
          <UploadFile />
        </section>

        <section>
          <FileList />
        </section>

      </div>
    </div>
  );
}

export default App;