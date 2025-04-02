import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/utils/localStorageUtils";
import { StockItem } from "@/data/stockItems";
import StockItemCard from "@/components/StockItemCard";
import FilterSidebar from "@/components/FilterSidebar";
import { MessageCircle, Filter } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { getStockItems } from "@/services/StockService";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious, 
  PaginationEllipsis 
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 10;

const ShopList = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatName, setChatName] = useState("");
  const [chatEmail, setChatEmail] = useState("");
  const [chatQuestion, setChatQuestion] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Fetch stock items
  useEffect(() => {
    const fetchStockItems = async () => {
      try {
        setLoading(true);
        const items = await getStockItems();
        setStockItems(items);
      } catch (error) {
        console.error("Error fetching stock items:", error);
        toast({
          title: "Error",
          description: "Failed to load stock items",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchStockItems();
  }, []);
  
  // Calculate total pages
  const totalPages = Math.ceil(stockItems.length / ITEMS_PER_PAGE);
  
  // Filter items based on search query
  const filteredItems = stockItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get current items for pagination
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  
  // Check if user is logged in
  useEffect(() => {
    const currentUser = getCurrentUser();
    setIsLoggedIn(!!currentUser);
  }, []);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const handleLogin = () => {
    navigate('/login');
  };

  const handleChatSubmit = () => {
    if (!chatName || !chatEmail || !chatQuestion) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Chat initiated",
      description: "Our team will get back to you shortly",
    });
    
    setChatOpen(false);
    setChatName("");
    setChatEmail("");
    setChatQuestion("");
  };

  const handleChatButtonClick = () => {
    console.log("Chat button clicked");
    setChatOpen(true);
  };
  
  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };
  
  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    
    // Always show first page
    items.push(
      <PaginationItem key="page-1">
        <PaginationLink 
          onClick={() => handlePageChange(1)} 
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Add ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Add pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue; // Skip first and last page as they're always shown
      
      items.push(
        <PaginationItem key={`page-${i}`}>
          <PaginationLink 
            onClick={() => handlePageChange(i)} 
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Add ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink 
            onClick={() => handlePageChange(totalPages)} 
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Breadcrumb navigation */}
      <div className="bg-slate-50 py-3 border-b mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-primary">Home</a>
            <span>•</span>
            <span className="font-medium text-gray-800">Stock List</span>
          </div>
        </div>
      </div>
      
      {/* Currency selector - fixed to right side, positioned higher */}
      {!isMobile && (
        <div className="fixed right-0 top-1/4 z-40">
          <div className="flex flex-col">
            <button className="bg-blue-700 text-white py-2 px-4 font-medium">
              USD $
            </button>
            <button className="bg-gray-800 text-white py-2 px-4 font-medium">
              EUR €
            </button>
          </div>
        </div>
      )}
      
      {/* Chat button - fixed to right side, positioned lower */}
      {!isMobile && (
        <div className="fixed right-0 top-1/3 z-40">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="bg-red-600 text-white p-3 flex items-center justify-center"
                  onClick={handleChatButtonClick}
                >
                  <MessageCircle size={24} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Start a live chat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}

      {/* Mobile floating buttons */}
      {isMobile && (
        <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-40">
          {/* Chat button */}
          <button
            className="bg-red-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
            onClick={handleChatButtonClick}
          >
            <MessageCircle size={24} />
          </button>
          
          {/* Filter button */}
          <button
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
            onClick={toggleMobileFilters}
          >
            <Filter size={24} />
          </button>
        </div>
      )}

      {/* Chat Dialog */}
      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent className="bg-white p-0 border-none max-w-md mx-4">
          <div className="bg-red-600 p-4 text-white">
            <DialogTitle className="text-xl font-bold text-center">Live Chat</DialogTitle>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Name"
                  value={chatName}
                  onChange={(e) => setChatName(e.target.value)}
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <div>
                <Input
                  placeholder="Email"
                  type="email"
                  value={chatEmail}
                  onChange={(e) => setChatEmail(e.target.value)}
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <div>
                <Input
                  placeholder="Question"
                  value={chatQuestion}
                  onChange={(e) => setChatQuestion(e.target.value)}
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <Button 
                onClick={handleChatSubmit}
                className="w-full bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2"
              >
                <span className="text-white">▶</span> Start Chat
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Main content */}
      <div className="flex-grow container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : isLoggedIn ? (
          <>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Mobile filter sidebar (shows as a dialog) */}
              {isMobile && (
                <Dialog open={showMobileFilters} onOpenChange={setShowMobileFilters}>
                  <DialogContent className="bg-white p-0 border-none max-w-md mx-4 h-[80vh] overflow-auto">
                    <div className="bg-blue-600 p-4 text-white">
                      <DialogTitle className="text-xl font-bold">Filters</DialogTitle>
                    </div>
                    <div className="p-4">
                      <FilterSidebar />
                      <div className="mt-6">
                        <Button 
                          onClick={() => setShowMobileFilters(false)}
                          className="w-full bg-blue-600"
                        >
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              
              {/* Left sidebar with filters - desktop only */}
              {!isMobile && (
                <div className="md:w-64 shrink-0">
                  <FilterSidebar />
                </div>
              )}
              
              {/* Main product listings */}
              <div className="flex-1">
                {/* Search and export header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                  <div className="mb-4 md:mb-0 flex-1 max-w-md w-full">
                    <Input 
                      placeholder="Search model, name..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                    <p className="text-sm text-gray-500 mt-2">Items: {filteredItems.length}</p>
                  </div>
                  
                  <Button variant="outline" className="whitespace-nowrap">
                    Export
                  </Button>
                </div>
                
                {/* Product listings */}
                <div className="space-y-4">
                  {currentItems.length > 0 ? (
                    currentItems.map(item => (
                      <StockItemCard key={item.id} item={item} />
                    ))
                  ) : (
                    <div className="p-8 text-center bg-gray-50 rounded-lg">
                      <p className="text-gray-500">No items found. Please adjust your search or check back later.</p>
                    </div>
                  )}
                </div>
                
                {/* Pagination - simplified on mobile */}
                <div className="mt-8 overflow-x-auto">
                  <Pagination>
                    <PaginationContent className={isMobile ? "justify-center gap-1" : ""}>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {isMobile ? (
                        <PaginationItem>
                          <PaginationLink isActive={true}>
                            {currentPage} / {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      ) : (
                        renderPaginationItems()
                      )}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-[#1a0050] mb-8">
              Please login to view stock list.
            </h1>
            
            <div className="flex justify-center">
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                size="lg"
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ShopList;
