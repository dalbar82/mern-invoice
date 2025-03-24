import React, { useState, useEffect, useRef, useCallback } from "react";
import { Grid, Box, Button, Tooltip, Container, TextField, Typography, CircularProgress } from "@mui/material";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import { useNavigate } from "react-router-dom";
import { useGetAllDocsQuery } from "../documentsApiSlice";
import ProjectListItem from "../../../components/ListItems/ProjectListItem";
import ProjectCreateEditForm from "./ProjectCreateEditForm";
import { docInitialState, itemsInitialState } from './initialState'
import {
	useCreateDocMutation,
	useGetSingleDocQuery,
	useUpdateDocMutation,
} from '../documentsApiSlice';
import axios from 'axios'
import SendSharpIcon from '@mui/icons-material/SendSharp'
import "../../../styles/pageHeader.css";
import Spinner from "../../../components/Spinner";
import { JobDocument } from "../../../types/JobDocument";
import { RxViewNone } from 'react-icons/rx'
import { User } from "../../../types/User";
import { Customer } from '../../../types/Customers'
import { BillingItem } from '../../../types/JobDocument'
import currencies from '../../../world_currencies.json'

const ProjectManagement: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<JobDocument[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProjectNumber, setSelectedProjectNumber] = useState<string | null>(null);
  const [lastCreatedAt, setLastCreatedAt] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [storedUser, setStoredUser] = useState<User>()

	const { data: singleDoc } = useGetSingleDocQuery(selectedProjectId)

	const [createDoc, { isLoading, isSuccess }] = useCreateDocMutation()
	const [sendEmail, setSendEmail] = useState(false)

	const [
		updateDoc,
		{
			isLoading: updateDocLoading,
			isSuccess: updateDocSuccess,
			data: updateDocData,
		},
	] = useUpdateDocMutation()

	const goBack = () => navigate(-1)

	const [docData, setDocData] = useState(docInitialState)
	const [items, setItems] = useState<BillingItem[]>(itemsInitialState)
	const [documentType, setDocumentType] = useState('Quotation')
	const [currency, setCurrency] = useState(currencies[0].code)
	const [name, setName] = useState('')
	const [organisation, setOrganisation] = useState()
	const [customer, setCustomer] = useState<Customer | null>(null)
	const [salesTax, setSalesTax] = useState(10)
	const [total, setTotal] = useState(0)
	const [subTotal, setSubTotal] = useState(0)
	const [rates, setRates] = useState(0)
	const [status, setStatus] = useState('Not Paid')
	const [autoCompleteAddress, setAutoCompleteAddress] = useState('')
	const [deliveryAddress, setDeliveryAddress] = useState('')
	const [deliveryCity, setDeliveryCity] = useState('')
	const [deliveryState, setDeliveryState] = useState('')
	const [deliveryPostcode, setDeliveryPostcode] = useState('')
	const [deliveryCountry, setDeliveryCountry] = useState('')
	const [deliveryNotes, setDeliveryNotes] = useState('')
	const [totalAmountReceived, setTotalAmountReceived] = useState(0)

  const { data, isFetching, refetch } = useGetAllDocsQuery(lastCreatedAt);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setStoredUser(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : '')

    if (data?.myDocuments?.length) {
      setProjects((prevData) => {
        const newProjects = data.myDocuments.filter(
          (newDoc: { documentNumber: string }) =>
            !prevData.some((oldDoc) => oldDoc.documentNumber === newDoc.documentNumber)
        );
        return [...prevData, ...newProjects];
      });

      setLastCreatedAt(data?.lastCreatedAt || null); // Update lastCreatedAt only if new data is received
    }
  }, [data]);
  console.log("store",storedUser);

	const doc = singleDoc?.document

	useEffect(() => {
		if (doc) {
			setName(doc.name)
			setOrganisation(doc.organisation)
			setDocData(doc)
			setDocumentType(doc.documentType)
			setItems(doc.billingItems)
			setSubTotal(doc.subTotal)
			setSalesTax(doc.salesTax)
			setTotal(doc.total)
			setCurrency(doc.currency)
			setRates(doc.rates)
			setCustomer(doc.customer)
			setDeliveryAddress(doc.deliveryAddress)
			setDeliveryCity(doc.deliveryCity)
			setDeliveryState(doc.deliveryState)
			setDeliveryPostcode(doc.deliveryPostcode)
			setDeliveryCountry(doc.deliveryCountry)
			setDeliveryNotes(doc.deliveryNotes)
		}
	}, [doc])
  
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || isFetching || !data?.hasMore) return;
  
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
  
    if (scrollHeight - (scrollTop + clientHeight) < 10) {
      // Ensure projects array has data before accessing the last item
      if (projects.length === 0) return;
  
      const lastCreatedAtScroll = new Date(projects[projects.length - 1]?.createdAt)
      
      if (lastCreatedAtScroll) {
        setLastCreatedAt(lastCreatedAt);
      }
    }
  }, [isFetching, data?.hasMore, projects, lastCreatedAt]);
  
 
  useEffect(() => {
    const scrollDiv = scrollContainerRef?.current;
    if (scrollDiv) {
      scrollDiv.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollDiv) {
        scrollDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "#ffc356";
      case "Quotation":
        return "#7bbef3";
      case "Order":
        return "#4ab84a";
      case "Invoice":
        return "#e64d4d";
      case "Paid":
        return "#ca43ca";
      default:
        return "#eeeeee";
    }
  };
  useEffect(() => {
    if (lastCreatedAt) {
      refetch();
    }
  }, [lastCreatedAt, refetch]);
  // **Filter Projects Based on Search Query**
  const filteredProjects = projects.filter((project) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      project?.documentNumber?.toString().toLowerCase().includes(searchLower) ||
      project?.name?.toLowerCase().includes(searchLower) ||
      project?.customer?.name?.toLowerCase().includes(searchLower)
    );
  });

  const sendPdfEmail = () => {
		setSendEmail(true)
		axios
			.post(`/api/v1/document/send-pdf`, {
				storedUser,
				doc,
				status,
				totalAmountReceived,
			})
			.then(() => setSendEmail(false))
			.catch((error) => {
				console.log(error)
			})
	}

  useEffect(() => {
		const subTotal = () => {
			const amtArr = document.getElementsByName("amount") as NodeListOf<HTMLInputElement>;
			let subtotal = 0;
	
			amtArr.forEach((input) => {
				if (input.value) {
					subtotal += +input.value; // Convert value to number
				}
			});
			setSubTotal(subtotal);
		};
		subTotal();
	}, [docData, items, setSubTotal]);

  useEffect(() => {
		const total = () => {
			const finalTotal = (rates / 100) * subTotal + subTotal
			setSalesTax((rates / 100) * subTotal)
			setTotal(finalTotal)
		}
		total()
	}, [items, rates, subTotal])

  return (
    <Grid container maxWidth="xl" sx={{ mt: 14, ml: 15, width: "90%" }}>
      {/* Header Section */}
      <Grid item xs={12} xl={12}>
        <Box className="page-header">
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, marginBottom: "20px", fontFamily: "Poppins" }}>
                Projects
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, marginBottom: "20px", fontFamily: "Poppins" }}>
                {documentType}
            </Typography>
          </Box>
          <Box>
            <Tooltip title="Add Job">
              <Button
                sx={{ p: "15px 0px 15px 10px", color: "#a6aeb3" }}
                variant="text"
                startIcon={<GroupAddRoundedIcon />}
                onClick={() => navigate("/create-doc")}
              ></Button>
            </Tooltip>
            {sendEmail ? (
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'center',
											}}>
											<CircularProgress />
										</Box>
									) : (
										<Tooltip title='Email'>
											<Button
												style={{ padding: '15px 0px 15px 10px', color: '#a6aeb3' }}
												variant='text'
												startIcon={<SendSharpIcon />}
												onClick={sendPdfEmail}></Button>
										</Tooltip>
									)}
          </Box>
        </Box>
      </Grid>

      {/* Project List */}
      <Grid item sx={{ml: 0, pl: 0}}>
        <Container sx={{ml: 0, pl: 0}}>
          <TextField
            fullWidth
            label="Search"
            placeholder="Search projects..."
            value={searchQuery}
            sx={{ marginBottom: 2 }}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div ref={scrollContainerRef} 
            id="scrollContainer" 
            className="scroll-container" 
            style={{
              maxHeight: "69vh", 
              display: "flex", 
              flexDirection: "column", 
              overflowY: "auto"}}>
            {isFetching && projects.length === 0 ? (
              <Spinner />
            ) : filteredProjects?.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectListItem
                  key={`${project?.documentNumber}-${index}`}
                  projectNumber={project?.documentNumber?.toString() || "No Job #"}
                  projectTitle={project?.name || "No Description"}
                  dueDate={project?.dueDate ? new Date(project.dueDate) : null}
                  customer={project?.customer?.name || "No Customer"}
                  borderColor={getStatusColor(project?.documentType)}
                  isSelected={selectedProjectNumber === project?.documentNumber}
                  onClick={() => {
                    setSelectedProjectNumber(project.documentNumber ?? null);
                    setSelectedProjectId(project._id);
                  }}
                />
              ))
            ) : (
              <Typography variant="body1" color="textSecondary">
                No projects found.
              </Typography>
            )}
          </div>

          {isFetching && <Typography textAlign="center">Loading more...</Typography>}
        </Container>
      </Grid>

      <Grid >
        {selectedProjectId ? <ProjectCreateEditForm
			id={selectedProjectId}
			docData={docData} 
      setDocData={setDocData}
			items={items} 
      setItems={setItems}
			documentType={documentType} 
      setDocumentType={setDocumentType}
			currency={currency} 
      setCurrency={setCurrency}
			name={name} 
      setName={setName}
			organisation={organisation}
			customer={customer} 
      setCustomer={setCustomer}
			salesTax={salesTax} 
      setSalesTax={setSalesTax}
			total={total} 
      setTotal={setTotal}
			subTotal={subTotal} 
      setSubTotal={setSubTotal}
			rates={rates} 
      setRates={setRates}
			status={status} 
      setStatus={setStatus}
			autoCompleteAddress={autoCompleteAddress} 
      setAutoCompleteAddress={setAutoCompleteAddress}
			deliveryAddress={deliveryAddress} 
      setDeliveryAddress={setDeliveryAddress}
			deliveryCity={deliveryCity} 
      setDeliveryCity={setDeliveryCity}
			deliveryState={deliveryState} 
      setDeliveryState={setDeliveryState}
			deliveryPostcode={deliveryPostcode} 
      setDeliveryPostcode={setDeliveryPostcode}
			deliveryCountry={deliveryCountry} 
      setDeliveryCountry={setDeliveryCountry}
			deliveryNotes={deliveryNotes} 
      setDeliveryNotes={setDeliveryNotes}
			totalAmountReceived={totalAmountReceived} 
      setTotalAmountReceived={setTotalAmountReceived}
		/>: 
        <div style={{
          marginLeft: "16px",
          width: "69vw",
          height: "100%",
          background: "white"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "140px"
          }}>
            <RxViewNone
              size='80px'
              color='#f0f0f0'
            />
            <h3>No Project selected</h3>
            <p>Click item to display project details</p>
        </div>
      </div>}
      </Grid>
    </Grid>
  );
};

export default ProjectManagement;
