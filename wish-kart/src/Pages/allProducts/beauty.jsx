import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Flex, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import { Checkbox } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GridProduct from "../../components/allProducts/gridProduct.jsx";
import Loader from "../../components/Loader.jsx";
import { getProducts } from "../../redux/Products/product.action.js";

const Men = () => {
  let { loading, error, data } = useSelector((store) => store.ProductsManager);
  let dispatch = useDispatch();
  let [filtCred,setFiltCred] = useState({}) 

//   console.log(data)
  let beautyHealth = data.filter((el)=>el.category=="Beauty and health")
  console.log(beautyHealth);

  let filtData = beautyHealth.filter((el)=> ((filtCred.above100? el.discounted_price>1000:"") || 
                                    (filtCred.a1000_500? (el.discounted_price<1000 && el.discounted_price>500):"") || 
                                    (filtCred.a500_300? (el.discounted_price<500 && el.discounted_price>300):"") ||
                                    (filtCred.below300? el.discounted_price<300:"" ))
                                    )
useEffect(() => {
if(data.length ==0){
    getProducts(dispatch);
}
}, [])
console.log(filtData)

const check =(e)=>{
  console.log(e.target)

  const {name,checked} =e.target
  setFiltCred({
    ...filtCred,
    [name]:checked
  })

}
if(loading){
  <Loader />
}
  
  

  return (
    <Box  mt={"150px"}>
      
    
      <Flex>
      <Box width={"20%"}>
      <Heading>Filter</Heading>
          <Box>
            <Accordion>
              

              <AccordionItem>
                <AccordionButton>
                  <Box as="span" flex='1' fontSize={20} textAlign='left'> Price</Box>
                </AccordionButton>
                {/* <AccordionPanel> */}
                <Stack  direction={"column"} ml="5%">
              
                  <Checkbox onChange={(e)=>check(e)} name="above100" size={"lg"} style={{marginLeft:"5px"}}>Above 1000</Checkbox>
                  <Checkbox onChange={(e)=>check(e)} name="a1000_500" size={"lg"} >1000 - 500</Checkbox>
                  <Checkbox onChange={(e)=>check(e)} name="a500_300" size={"lg"}>500 - 300</Checkbox>
                  <Checkbox onChange={(e)=>check(e)} name="below300" size={"lg"} >Below 300</Checkbox>

                </Stack>
                {/* </AccordionPanel> */}
              </AccordionItem>
              </Accordion>
      </Box>
    
      </Box>
      <Box style={{width:"90%",margin:"auto"}} border="0px solid red">

        <SimpleGrid columns={[1, 2, 3, 4]} spacing={10}  >
          {(filtData.length==0? beautyHealth:filtData).map((el) => {
            return( <GridProduct key={el.id} props={el} />);
          })}
        </SimpleGrid>
      </Box>
    
    </Flex>
    </Box>
  );
};

export default Men;
